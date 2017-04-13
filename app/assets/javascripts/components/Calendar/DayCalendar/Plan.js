import React from "react";
import Relay from "react-relay";

class Plan extends React.Component {
  render() {
    const plan = this.props.plan;

    return (
      <div>
        <span>{plan.name}</span>
        <span>{plan.start}</span> - <span>{plan.finish}</span>
      </div>
    );
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
