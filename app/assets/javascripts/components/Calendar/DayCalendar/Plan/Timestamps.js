import React from "react";
import PropTypes from "prop-types";

import Timestamp from "./Timestamps/Timestamp";
import Separator from "./Timestamps/Separator";

class Timestamps extends React.Component {
  static propTypes = {
    start: PropTypes.object.isRequired,
    finish: PropTypes.object.isRequired,
    referenceDateTime: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Timestamp dateTime={this.start()} referenceDateTime={this.referenceDateTime()}/>
        <Separator/>
        <Timestamp dateTime={this.finish()} referenceDateTime={this.referenceDateTime()}/>
      </div>
    );
  }

  start() {
    return this.props.start;
  }

  finish() {
    return this.props.finish;
  }

  referenceDateTime() {
    return this.props.referenceDateTime;
  }
}

export default Timestamps;
