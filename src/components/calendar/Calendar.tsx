import React, { useState } from "react";
import moment from "moment";

import { CalendarContextProvider } from "./CalendarContext";
import CalendarTitle from "./CalendarTitle";
import CalendarWeek from "./CalendarWeek";
import CalendarControl from "./CalendarControl";
import CalendarLegend from "./CalendarLegend";

export default function Calendar(): JSX.Element {
  const [week, setWeek] = useState<number>(moment().week());

  function setPrevWeek(): void {
    setWeek(week - 1);
  }

  function setNextWeek(): void {
    setWeek(week + 1);
  }
  return (
    <CalendarContextProvider>
      <CalendarTitle week={week} />
      <CalendarWeek week={week} />
      <CalendarControl week={week} onNext={setNextWeek} onPrev={setPrevWeek} />
      <CalendarLegend />
    </CalendarContextProvider>
  );
}
