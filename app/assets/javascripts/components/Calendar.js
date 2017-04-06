import React from "react";
import Relay from "react-relay";

import Plan from "./calendar/Plan";

class Calendar extends React.Component {
  render() {
    const plans =
      this.props.calendar.plans.map(plan => {
        return (<Plan key={plan.__dataID__} plan={plan} />);
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
        plans {
          ${Plan.getFragment("plan")}
        }
      }
    `
  }
});
