import moment from "moment";

export default {
  serverFormat(momentObject) {
    return momentObject.format("YYYY-MM-DDTHH:mmZZ");
  }
};
