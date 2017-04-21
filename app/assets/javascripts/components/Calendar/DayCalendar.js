import React from "react";
import Relay from "react-relay";
import moment from "moment";

import Plan from "./DayCalendar/Plan";

class DayCalendar extends React.Component {
  render() {
    const plans =
      this.props.calendar.plans.map(plan => {
        return (<Plan key={plan.__dataID__} plan={plan} />);
      });

    const { date } = this.props;
    const formattedDate = moment(date).format("DD MMMM YYYY");

    return (
      <div>
        <h2>{formattedDate}</h2>

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
