import moment from "moment";

export default {
  firstDayOfMonth(date) {
    date = moment.utc(date);

    return moment.utc([date.year(), date.month(), 1]);
  },

  monthName(date) {
    date = moment.utc(date);

    return moment.months()[date.month()];
  },

  firstDayOfWeek(date) {
    date = moment.utc(date);

    const diff = date.isoWeekday() - 1;

    return date.clone().subtract(diff, "days");
  },

  yearMonthDate(date) {
    date = moment.utc(date);

    return {year: date.year(), month: date.month(), date: date.date()}
  },

  monthDaysByWeek(date) {
    date = moment(date);

    const thisMonth = date.month();
    const firstDayOfMonth = date.startOf("month");
    const firstDayOfFirstWeek = this.firstDayOfWeek(firstDayOfMonth);

    const now = moment.utc();

    return [1, 2, 3, 4, 5, 6].map(weekNumber => {
      const days = [1, 2, 3, 4, 5, 6, 7].map(dayNumber => {
        const day = firstDayOfFirstWeek.clone().add(weekNumber - 1, "weeks").add(dayNumber - 1, "days");

        const isThisMonth = day.month() == thisMonth;
        const isCurrentDate = day.isSame(now, "day");

        return {dayNumber, ...this.yearMonthDate(day), isThisMonth, isCurrentDate};
      });

      return {weekNumber, days};
    });
  }
};
