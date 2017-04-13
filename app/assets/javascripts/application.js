import React from "react";
import ReactDOM from "react-dom";

import Calendar from "./components/Calendar";

window.onload = function() {
  const calendarAppContainer = document.getElementById("calendar_app");
  if (calendarAppContainer) {
    ReactDOM.render(<Calendar />, calendarAppContainer);
  }
}
