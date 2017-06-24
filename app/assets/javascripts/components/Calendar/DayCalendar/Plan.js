import React from "react";
import PropTypes from "prop-types";
import Relay from "react-relay";
import moment from "moment";

import Name from "./Plan/Name";
import Timestamps from "./Plan/Timestamps";

class Plan extends React.Component {
  static propTypes = {
    plan: PropTypes.object.isRequired,
    referenceDate: PropTypes.string.isRequired,
  };

  render() {
    const plan = this.props.plan;

    return (
      <div>
        <Name name={this.name()}/>
        <Timestamps start={this.start()} finish={this.finish()} referenceDateTime={this.referenceDate()}/>
      </div>
    );
  }

  plan() {
    return this.props.plan;
  }

  name() {
    return this.plan().name;
  }

  start() {
    return moment(this.plan().start);
  }

  finish() {
    return moment(this.plan().finish);
  }

  referenceDate() {
    return moment(this.props.referenceDate);
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
