import React from "react";
import Relay from "react-relay";
import moment from "moment";

import Plan from "./DayCalendar/Plan";

class DayCalendar extends React.Component {
  render() {
    const { date } = this.props;

    const plans =
      this.props.calendar.plans.map(plan => {
        return (<Plan key={plan.__dataID__} plan={plan} referenceDate={date} />);
      });

    const formattedDate = moment.utc(date).format("DD MMMM YYYY");

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
