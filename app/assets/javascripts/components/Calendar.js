import React from "react";
import Relay from "react-relay";
import moment from "moment";

import DayCalendar from "./Calendar/DayCalendar";
import WeekCalendar from "./Calendar/WeekCalendar";
import MonthCalendar from "./Calendar/MonthCalendar";
import MomentObject from "moment_object";

const DAY_CALENDAR_TYPE = "day";
const WEEK_CALENDAR_TYPE = "week";
const MONTH_CALENDAR_TYPE = "month";

const CALENDAR_COMPONENTS = {
  [DAY_CALENDAR_TYPE]: DayCalendar,
  [WEEK_CALENDAR_TYPE]: WeekCalendar,
  [MONTH_CALENDAR_TYPE]: MonthCalendar
}

class CalendarRoute extends Relay.Route {
  static queries = {
    calendar: () => Relay.QL`
      query { calendar(spec: $spec) }
    `
  };

  static paramDefinitions = {
    spec: {required: true}
  };

  static routeName = "Calendar";
}

class Calendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.stateFromUrl();

    window.onpopstate = () => {
      this.setState(this.stateFromUrl());
    };
  }

  render() {
    const { date, calendarType } = this.state;

    const formattedDate = MomentObject.serverFormat(date);

    const calendarRoute = new CalendarRoute({
      spec: `${this.state.calendarType}&${formattedDate}`,
      date: formattedDate,
      changeState: this.changeState.bind(this)
    });

    const CalendarComponent = CALENDAR_COMPONENTS[calendarType];

    return (
      <div>
        <button onClick={this.selectCalendarType(DAY_CALENDAR_TYPE)}>Day</button>
        <button onClick={this.selectCalendarType(WEEK_CALENDAR_TYPE)}>Week</button>
        <button onClick={this.selectCalendarType(MONTH_CALENDAR_TYPE)}>Month</button>

        <Relay.RootContainer
          Component={CalendarComponent}
          route={calendarRoute}
          forceFetch={true}
        />
      </div>
    );
  }

  selectCalendarType(type) {
    return () => { this.changeState({calendarType: type}) };
  }

  changeState(newState) {
    const { date, calendarType } = this.state;

    const newDate = newState.date || date;
    const newCalendarType = newState.calendarType || calendarType;

    if (newDate != date || newCalendarType != calendarType) {
      this.setState({date: newDate, calendarType: newCalendarType});
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.set("date", MomentObject.serverFormat(newDate));
      urlSearchParams.set("calendarType", newCalendarType);
      history.pushState({}, null, window.location.pathname + "?" + urlSearchParams.toString());
    }
  }

  stateFromUrl() {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const date = urlSearchParams.has("date") ? moment(urlSearchParams.get("date")) : moment()
    const calendarType = urlSearchParams.get("calendarType") || DAY_CALENDAR_TYPE

    return { date, calendarType };
  }
}

export default Calendar;
