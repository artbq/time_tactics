import React from "react";
import Relay from "react-relay";
import moment from "moment";

import MomentUtils from "../../utils/moment";

import WeekdayNames from "./MonthCalendar/WeekdayNames";
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
    const numberOfPlans = this.props.calendar.number_of_plans;
    const { date } = this.state;
    const monthName = MomentUtils.monthName(date);

    const daysByWeek = MomentUtils.monthDaysByWeek(date);

    // Style constants
    const dayElementSideSize = 50;
    const weekTitleWidth = 200;

    const weeks = daysByWeek.map(week => {
      return (
        <Week
          key={week.weekNumber}
          {...week}
          dayElementSideSize={dayElementSideSize}
          weekTitleWidth={weekTitleWidth}
          changeState={changeState}
        />
      );
    });

    return (
      <div>
        <h2>{monthName}</h2>
        <div>Number of plans: {numberOfPlans}</div>
        <div><WeekdayNames weekdayElementSideSize={dayElementSideSize} marginLeft={weekTitleWidth} /></div>
        <div>{weeks}</div>
      </div>
    );
  }
}

export default Relay.createContainer(MonthCalendar, {
  fragments: {
    calendar: () => Relay.QL`
      fragment on Calendar {
        number_of_plans
      }
    `
  }
});
