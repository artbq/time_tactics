import React from "react";

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
      <button style={style}>{date}</button>
    );
  }
}

export default Day;
