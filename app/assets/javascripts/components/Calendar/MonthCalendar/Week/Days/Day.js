import React from "react";
import moment from "moment";

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
    const { year, month, date, changeState } = this.props;

    changeState({date: moment.utc([year, month, date]), calendarType: "day"});
  }
}

export default Day;