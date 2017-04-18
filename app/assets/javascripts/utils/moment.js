import moment from "moment";

export default {
  firstDayOfMonth(date) {
    date = moment(date);
    return moment([date.year(), date.month(), 1]);
  },

  monthName(date) {
    date = moment(date);
    return moment.months()[date.month()];
  }
};
