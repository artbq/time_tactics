import React from "react";
import PropTypes from "prop-types";
import Relay from "react-relay";
import moment from "moment";

class Plan extends React.Component {
  static propTypes = {
    plan: PropTypes.object.isRequired,
    referenceDate: PropTypes.string.isRequired,
  };

  render() {
    const plan = this.props.plan;

    return (
      <div>
        <span>{plan.name}</span>&nbsp;
        <span>{this._formatDateTime(plan.start)}</span> - <span>{this._formatDateTime(plan.finish)}</span>
      </div>
    );
  }

  _formatDateTime(dateTimeString) {
    const referenceDate = moment.utc(this.props.referenceDate);
    const dateTime = moment.utc(dateTimeString, "YYYY-MM-DD HH:mm");

    if (dateTime.isSame(referenceDate, "day")) {
      return dateTime.local().format("HH:mm");
    } else {
      return dateTime.local().format("HH:mm, DD MMM YYYY");
    }
  }
}

export default Relay.createContainer(Plan, {
  fragments: {
    plan: () => Relay.QL`
      fragment on Plan {
        name,
        start,
        finish
      }
    `
  }
});
