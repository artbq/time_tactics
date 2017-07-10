import React from "react";
import Relay from "react-relay";
import moment from "moment";

import CalendarSpec from "lib/calendar_spec";
import * as calendarTypes from "constants/calendar_types";
import CalendarRoute from "relay/routes/CalendarRoute";
import { DayCalendar, WeekCalendar, MonthCalendar } from "./Calendar/index";

const CALENDAR_COMPONENTS = {
  [calendarTypes.DAY]: DayCalendar,
  [calendarTypes.WEEK]: WeekCalendar,
  [calendarTypes.MONTH]: MonthCalendar,
};

class Calendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = { calendarSpec: CalendarSpec.fromUrl() };

    window.onpopstate = () => {
      this.setState({ calendarSpec: CalendarSpec.fromUrl() });
    };
  }

  render() {
    const calendarRoute = new CalendarRoute({
      spec: this.calendarSpec().toString(),
      date: this.calendarSpec().date,
      navigateToAnotherCalendar: this.navigateToAnotherCalendar.bind(this),
    });

    const CalendarComponent = CALENDAR_COMPONENTS[this.calendarSpec().calendarType];

    return (
      <div>
        <button onClick={this.calendarTypeButtonClickHandler(calendarTypes.DAY)}>
          Day
        </button>
        <button onClick={this.calendarTypeButtonClickHandler(calendarTypes.WEEK)}>
          Week
        </button>
        <button onClick={this.calendarTypeButtonClickHandler(calendarTypes.MONTH)}>
          Month
        </button>

        <Relay.RootContainer
          Component={CalendarComponent}
          route={calendarRoute}
          forceFetch={true}
        />
      </div>
    );
  }

  calendarSpec() {
    return this.state.calendarSpec;
  }

  calendarTypeButtonClickHandler(type) {
    return () => {
      const newCalendarSpec = this.calendarSpec().updateCalendarType(type);

      this.navigateToAnotherCalendar(newCalendarSpec);
    };
  }

  navigateToAnotherCalendar(newCalendarSpec) {
    if (!this.calendarSpec().isEqual(newCalendarSpec)) {
      const newUrl = window.location.pathname +
        "?" +
        newCalendarSpec.toUrlSearchParamsString();

      history.pushState({}, null, newUrl);

      this.setState({ calendarSpec: newCalendarSpec });
    }
  }
}

export default Calendar;
