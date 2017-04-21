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
    const { changeState } = this.props;
    const { numberOfPlans } = this.props.calendar;
    const { date } = this.state;
    const monthName = MomentUtils.monthName(date);

    const daysByWeek = MomentUtils.monthDaysByWeek(date);

    const weeks = daysByWeek.map(week => {
      return (<Week key={week.weekNumber} {...week} changeState={changeState} />);
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
