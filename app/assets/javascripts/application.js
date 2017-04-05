import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";

import Calendar from "./components/Calendar";

class CalendarRoute extends Relay.Route {
  static queries = {
    calendar: () => Relay.QL`
      query { calendar(date: $date) }
    `
  };

  static paramDefinitions = {
    date: {required: true}
  };

  static routeName = "Calendar";
}

const calendarRoute = new CalendarRoute({date: "2017-3-14"});

window.onload = function() {
  const calendarAppContainer = document.getElementById("calendar_app");
  if (calendarAppContainer) {
    ReactDOM.render(
      <Relay.RootContainer Component={Calendar} route={calendarRoute} />,
      calendarAppContainer
    );
  }
}
