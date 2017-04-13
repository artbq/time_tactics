import React from "react";
import Relay from "react-relay";

import DayCalendar from "./Calendar/DayCalendar";
import WeekCalendar from "./Calendar/WeekCalendar";

const DAY_CALENDAR_TYPE = "day";
const WEEK_CALENDAR_TYPE = "week";

const CALENDAR_COMPONENTS = {
  [DAY_CALENDAR_TYPE]: DayCalendar,
  [WEEK_CALENDAR_TYPE]: WeekCalendar
}

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

class Calendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      calendarType: DAY_CALENDAR_TYPE
    };
  }

  render() {
    const calendarType = this.state.calendarType;
    const calendarRoute = new CalendarRoute({date: "2017-3-14"});
    const CalendarComponent = CALENDAR_COMPONENTS[calendarType];

    return (
      <div>
        <button onClick={this.selectCalendarType(DAY_CALENDAR_TYPE)}>Day</button>
        <button onClick={this.selectCalendarType(WEEK_CALENDAR_TYPE)}>Week</button>

        <div>
          Calendar type: {calendarType}
        </div>

        <Relay.RootContainer Component={CalendarComponent} route={calendarRoute} />
      </div>
    );
  }

  selectCalendarType(type) {
    return () => { this.setState({calendarType: type}) };
  }
}

export default Calendar;
