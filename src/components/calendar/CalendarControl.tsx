import React from "react";
import moment from "moment";

interface CalendarControlProps {
  week: number;
  onNext: () => void;
  onPrev: () => void;
}
export default function CalendarControl({
  week,
  onNext,
  onPrev,
}: CalendarControlProps): JSX.Element {
  const currWeek = moment().week();

  return (
    <div className="control">
      {currWeek < week && (
        <div className="control-button" onClick={onPrev}>
          {"< Previous week"}
        </div>
      )}
      {currWeek < week && week !== 52 && <div className="divider" />}
      {week < 52 && (
        <div className="control-button" onClick={onNext}>
          {"Next week >"}
        </div>
      )}
    </div>
  );
}
