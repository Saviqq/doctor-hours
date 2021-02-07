import React from "react";
import moment from "moment";
import "./style.css";

interface CalendarTitleProps {
  week: number;
}

export default function CalendarTitle({
  week,
}: CalendarTitleProps): JSX.Element {
  function renderTitle(): string {
    const titleWeek = moment().week(week);
    const monday = moment(titleWeek).isoWeekday(1);
    const saturday = moment(titleWeek).isoWeekday(6);
    const currWeek = moment().week();

    if (currWeek === week) {
      return `Current week (${monday.format("DD.MM")} - ${saturday.format(
        "DD.MM"
      )})`;
    } else if (currWeek + 1 === week) {
      return `Next week (${monday.format("DD.MM")} - ${saturday.format(
        "DD.MM"
      )})`;
    } else
      return `Week ${week} (${monday.format("DD.MM")} - ${saturday.format(
        "DD.MM"
      )})`;
  }

  return <div className="title">{renderTitle()}</div>;
}
