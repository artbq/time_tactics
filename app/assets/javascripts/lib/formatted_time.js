import moment from "moment";

export default {
  addOffset(timeString) {
    const offset = moment().format("ZZ");

    return `${timeString} ${offset}`;
  }
};
