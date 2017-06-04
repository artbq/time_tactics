import React from "react";
import PropTypes from "prop-types";

class Timestamp extends React.Component {
  static propTypes = {
    dateTime: PropTypes.object.isRequired,
    referenceDateTime: PropTypes.object.isRequired
  };

  style() {
    return {
      display: "inline-block"
    };
  }

  render() {
    return (
      <div style={this.style()}>{this.formattedDateTime()}</div>
    );
  }

  formattedDateTime() {
    if (this.dateTime().isSame(this.referenceDateTime(), "day")) {
      return this.dateTime().format("HH:mm");
    } else {
      return this.dateTime().format("HH:mm, DD MMM YYYY");
    }
  }

  dateTime() {
    return this.props.dateTime;
  }

  referenceDateTime() {
    return this.props.referenceDateTime;
  }
}

export default Timestamp;
