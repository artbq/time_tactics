import React from "react";
import ReactDOM from "react-dom";

window.onload = function() {
  const calendarAppContainer = document.getElementById("calendar_app");
  if (calendarAppContainer) {
    ReactDOM.render(<h2>Hello, World!</h2>, calendarAppContainer);
  }
}
