import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";

import {
  CalendarTimeSlot,
  TimeSlotState,
  CalendarWeekData,
} from "../../dto/calendar";
import RestDataLoader from "../common/RestDataLoader";
import Spinner from "../common/Spinner";
import calendarService from "../../services/calendarService";
import useCalendarContext from "./CalendarContext";

/**
 *  I've decided to remove Sundays from doctor's calendar as by assigment
 *  on Sunday office is always closed, it makes calendar cleaner and also
 *  don't disrupt user with it's CLOSED status, hence better UX.
 */
const DAYS: Array<keyof CalendarWeekData> = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export default function CalendarWeekLoader({
  week,
}: {
  week: number;
}): JSX.Element {
  const context = useCalendarContext();
  const weekData = context.getWeekData(week);

  return (
    <div className="week">
      {weekData ? (
        <CalendarWeek week={week} data={weekData} />
      ) : (
        <RestDataLoader
          promiseGetter={() => calendarService.getMockCalendarWeekData(week)}
        >
          {(respone) => <CalendarWeek week={week} data={respone} />}
        </RestDataLoader>
      )}
    </div>
  );
}

interface CalendarWeekProps {
  week: number;
  data: CalendarWeekData;
}

function CalendarWeek({ week, data }: CalendarWeekProps): JSX.Element {
  const context = useCalendarContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    context.setWeekData(week, data);
  }, [data]);

  async function onSlotClick(
    slotSate: TimeSlotState,
    day: keyof CalendarWeekData,
    timeSlotId: number
  ) {
    if (slotSate === "INVALID" || slotSate === "BREAK") {
      alert(
        "This time slot is not valid for selection, please choose another time slot!"
      );
    } else if (slotSate === "OCCUPIED") {
      alert(
        "This time slot is already booked by another doctor patient, please choose another time slot!"
      );
    } else if (slotSate === "SELECTED") {
      setIsLoading(true);
      await calendarService
        .updateTimeSlotState({
          week,
          day,
          timeSlotId,
          slotState: "AVAILIBLE",
        })
        .then((result) => context.setWeekData(week, result.response));
      setIsLoading(false);
    } else if (slotSate === "AVAILIBLE") {
      setIsLoading(true);
      await calendarService
        .updateTimeSlotState({
          week,
          day,
          timeSlotId,
          slotState: "SELECTED",
        })
        .then((result) => context.setWeekData(week, result.response))
        .catch(() =>
          alert(
            "You have already selected appoinment for that day or you have already two appoinments planned for the week"
          )
        );
      setIsLoading(false);
    }
  }

  function getSlotState(
    timeSlotIndex: number,
    timeSlots?: Array<CalendarTimeSlot>
  ): TimeSlotState {
    if (timeSlots) {
      const timeSlot = timeSlots.find((it) => it.timeSlotId === timeSlotIndex);
      return timeSlot ? timeSlot.state : "INVALID";
    } else {
      return "INVALID";
    }
  }

  function renderTimeSlots(
    day: Moment,
    fromHour: number,
    toHour: number,
    timeSlots?: Array<CalendarTimeSlot>
  ): JSX.Element[] {
    day.startOf("day").hours(fromHour);

    const slotsToRender: Array<{
      slotState: TimeSlotState;
      day: Moment;
      dayName: keyof CalendarWeekData;
      timeSlotIndex: number;
    }> = [];
    let timeSlotIndex = 0;
    while (day.hours() < toHour) {
      slotsToRender.push({
        slotState: getSlotState(timeSlotIndex, timeSlots),
        day: moment(day),
        dayName: DAYS[day.isoWeekday() - 1],
        timeSlotIndex,
      });

      day.add(30, "m");
      timeSlotIndex++;
    }
    return slotsToRender.map((slot) => {
      const className = `timeslot ${slot.slotState.toLowerCase()}`;

      return (
        <div
          onClick={() =>
            onSlotClick(slot.slotState, slot.dayName, slot.timeSlotIndex)
          }
          className={className}
          key={slot.day.format()}
        >{`${slot.day.format("HH:mm")}`}</div>
      );
    });
  }

  function renderWeek(): JSX.Element {
    const weekDate = moment().week(week);

    return (
      <>
        {DAYS.map((it) => {
          const day = moment(weekDate).isoWeekday(it);
          const isToday = day.isSame(moment());
          const renderDay =
            day.date() % 2 === 1 || it === "saturday"
              ? renderTimeSlots(day, 8, 14, data[it])
              : renderTimeSlots(day, 13, 19, data[it]);

          return (
            <div className="day-container" key={it}>
              <div>
                <div className={`day ${isToday && "current-day"}`}>
                  {it.toUpperCase()}
                </div>
                <i className={`date ${isToday && "current-day"}`}>
                  {day.format("DD.MM")}
                </i>
              </div>
              {renderDay}
            </div>
          );
        })}
      </>
    );
  }

  return !isLoading ? renderWeek() : <Spinner size="large" />;
}
