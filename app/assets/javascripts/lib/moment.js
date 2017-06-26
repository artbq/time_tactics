import moment from "moment";

const DEFAULT_FORMAT_TEMPLATE = "server";

const FORMAT_TEMPLATES = {
  [DEFAULT_FORMAT_TEMPLATE]: "YYYY-MM-DDTHH:mmZZ"
};

export default {
  format(date, formatTemplateID) {
    const formatTemplate =
      FORMAT_TEMPLATES[formatTemplateID] ||
      FORMAT_TEMPLATES[DEFAULT_FORMAT_TEMPLATE]

    return date.format(formatTemplate);
  }
};
