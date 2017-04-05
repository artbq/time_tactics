import React from "react";
import Relay from "react-relay";

import Plan from "./calendar/Plan";

class Calendar extends React.Component {
  render() {
    const plans =
      this.props.calendar.plans.edges.map(edge => {
        return (<Plan key={edge.node.__dataID__} plan={edge.node} />);
      });

    return (
      <div>{plans}</div>
    );
  }
}

export default Relay.createContainer(Calendar, {
  fragments: {
    calendar: () => Relay.QL`
      fragment on Calendar {
        plans(first: 10) {
          edges {
            node {
              ${Plan.getFragment("plan", {})}
            }
          }
        }
      }
    `
  }
});
