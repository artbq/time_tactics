import moment from "moment";

import Moment from "lib/moment";

import * as calendarTypes from "constants/calendar_types";

class CalendarSpec {
  static CALENDAR_TYPE = "calendarType";
  static DATE = "date";

  static fromUrl() {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const date =
      urlSearchParams.has(CalendarSpec.DATE) ?
        moment(urlSearchParams.get(CalendarSpec.DATE)) :
        moment();

    const calendarType =
      urlSearchParams.get(CalendarSpec.CALENDAR_TYPE) || calendarTypes.DAY;

    return new CalendarSpec(calendarType, date);
  }

  static day(date) {
    return new CalendarSpec(calendarTypes.DAY, date);
  }

  static week(date) {
    return new CalendarSpec(calendarTypes.WEEK, date);
  }

  static month(date) {
    return new CalendarSpec(calendarTypes.MONTH, date);
  }

  constructor(calendarType, date) {
    this.calendarType = calendarType;
    this.date = date;
  }

  isEqual(other) {
    return this.calendarType == other.calendarType && this.date == other.date;
  }

  updateCalendarType(newCalendarType) {
    return new CalendarSpec(newCalendarType, this.date);
  }

  updateDate(newDate) {
    return new CalendarSpec(this.calendarType, newDate);
  }

  toString() {
    return `${this.calendarType}&${Moment.format(this.date)}`;
  }

  toUrlSearchParamsString() {
    let urlSearchParams = new URLSearchParams();

    urlSearchParams.set(CalendarSpec.CALENDAR_TYPE, this.calendarType);
    urlSearchParams.set(CalendarSpec.DATE, Moment.format(this.date));

    return urlSearchParams.toString();
  }
}

export default CalendarSpec;
