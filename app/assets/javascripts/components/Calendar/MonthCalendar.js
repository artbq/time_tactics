import React from "react";
import Relay from "react-relay";
import moment from "moment";

import MomentUtils from "../../utils/moment";

import Week from "./MonthCalendar/Week";

class MonthCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: MomentUtils.firstDayOfMonth(props.date)
    };
  }

  render() {
    const numberOfPlans = this.props.calendar.numberOfPlans;
    const date = this.state.date;
    const monthName = MomentUtils.monthName(date);

    const daysByWeek = MomentUtils.monthDaysByWeek(date);

    const weeks = daysByWeek.map(week => {
      return (<Week key={week.weekNumber} {...week} />);
    });

    return (
      <div>
        <h2>{monthName}</h2>
        <div>Number of plans: {numberOfPlans}</div>
        <div>{weeks}</div>
      </div>
    );
  }
}

export default Relay.createContainer(MonthCalendar, {
  fragments: {
    calendar: () => Relay.QL`
      fragment on Calendar {
        numberOfPlans
      }
    `
  }
});
