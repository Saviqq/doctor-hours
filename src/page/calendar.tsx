import React from "react";

import Calendar from "../components/calendar/Calendar";
import "./page.css";

export default function CalendarPage(): JSX.Element {
  return (
    <div className="container">
      <div className="header">Dr. Albert Crentist's office hours</div>
      <Calendar />
    </div>
  );
}
