import React from "react";
import Relay from "react-relay";

class WeekCalendar extends React.Component {
  render() {
    const numberOfPlans = this.props.calendar.numberOfPlans;

    return (
      <div>
        <h2>Week Calendar</h2>

        Number of plans: {numberOfPlans}
      </div>
    );
  }
}

export default Relay.createContainer(WeekCalendar, {
  fragments: {
    calendar: () => Relay.QL`
      fragment on Calendar {
        numberOfPlans
      }
    `
  }
});
