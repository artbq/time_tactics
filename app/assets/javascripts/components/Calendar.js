import React from "react";
import Relay from "react-relay";

import DayCalendar from "./Calendar/DayCalendar";

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

export default Calendar;

class Calendar extends React.Component {
  render() {
    const calendarRoute = new CalendarRoute({date: "2017-3-14"});

    return (
      <div>
        <Relay.RootContainer Component={DayCalendar} route={calendarRoute} />
      </div>
    );
  }
}
