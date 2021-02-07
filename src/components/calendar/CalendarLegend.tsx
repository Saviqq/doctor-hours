import React, { useState } from "react";

export default function CalendarLegend(): JSX.Element {
  const [visible, setVisible] = useState(false);

  return (
    <div className="legend-container">
      <div onClick={() => setVisible(!visible)} className="legend-button">
        Legend {!visible ? <>&#9660;</> : <>&#9650;</>}
      </div>
      {visible && (
        <div>
          <div className="legend">
            <div className="legend-color legend-availible" />
            <div className="legend-text">Timeslot is availible to select</div>
          </div>
          <div className="legend">
            <div className="legend-color occupied" />
            <div className="legend-text">
              Timeslot is already selected by patient
            </div>
          </div>
          <div className="legend">
            <div className="legend-color invalid" />
            <div className="legend-text">
              Dr. Albert Crentist is either not working or is on lunch break, or
              it's past date
            </div>
          </div>

          <div className="legend">
            <div className="legend-color selected" />
            <div className="legend-text">
              Timeslot you have previously selected
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
