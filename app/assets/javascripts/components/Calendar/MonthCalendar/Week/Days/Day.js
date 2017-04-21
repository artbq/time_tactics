import React from "react";
import moment from "moment";

class Day extends React.Component {
  render() {
    const { date, isThisMonth, isCurrentDate } = this.props;

    const color = isThisMonth ? (isCurrentDate ? "blue" : "black") : "grey";

    const style = {
      color,
      display: "inline-block",
      width: 25,
      height: 25,
      border: "none",
      backgroundColor: "white"
    };

    return (
      <button style={style} onClick={this.gotoDay.bind(this)}>{date}</button>
    );
  }

  gotoDay() {
    const { year, month, date, changeState } = this.props;

    changeState({date: moment([year, month, date]), calendarType: "day"});
  }
}

export default Day;
