import React from "react";
import moment from "moment";

import CalendarSpec from "lib/calendar_spec";

class Day extends React.Component {
  render() {
    const { date, isThisMonth, isCurrentDate, sideSize } = this.props;

    const color = isThisMonth ? (isCurrentDate ? "blue" : "black") : "grey";

    const style = {
      color,
      display: "inline-block",
      width: sideSize,
      height: sideSize,
      border: "none",
      backgroundColor: "white",
      cursor: "pointer",
      textAlign: "center",
    };

    return (
      <button style={style} onClick={this.gotoDay.bind(this)}>{date}</button>
    );
  }

  gotoDay() {
    const { year, month, date, navigateToAnotherCalendar } = this.props;

    navigateToAnotherCalendar(CalendarSpec.day(moment([year, month, date])));
  }
}

export default Day;
