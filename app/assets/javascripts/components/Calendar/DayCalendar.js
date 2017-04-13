import React from "react";
import Relay from "react-relay";

import Plan from "./DayCalendar/Plan";

class DayCalendar extends React.Component {
  render() {
    const plans =
      this.props.calendar.plans.map(plan => {
        return (<Plan key={plan.__dataID__} plan={plan} />);
      });

    return (
      <div>
        <h2>Day Calendar</h2>

        <div>{plans}</div>
      </div>
    );
  }
}

export default Relay.createContainer(DayCalendar, {
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
