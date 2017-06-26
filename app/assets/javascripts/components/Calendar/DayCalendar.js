import React from "react";
import PropTypes from "prop-types";
import Relay from "react-relay";
import moment from "moment";

import Plan from "./DayCalendar/Plan";
import CreatePlanForm from "./DayCalendar/CreatePlanForm";

class DayCalendar extends React.Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
  };

  render() {
    const {calendar, date} = this.props;

    const plans =
      calendar.plans.map(plan => {
        return (
          <Plan key={plan.__dataID__} plan={plan} referenceDate={date}/>
        );
      });

    const formattedDate = moment(date).format("DD MMMM YYYY");

    return (
      <div>
        <h2>{formattedDate}</h2>

        <CreatePlanForm
          relay={this.props.relay}
          date={this.props.date}
          calendarID={this.props.calendar.id}
        />

        <div>{plans}</div>
      </div>
    );
  }
}

export default Relay.createContainer(DayCalendar, {
  fragments: {
    calendar: () => Relay.QL`
      fragment on Calendar {
        id,
        plans {
          ${Plan.getFragment("plan")}
        }
      }
    `
  }
});
