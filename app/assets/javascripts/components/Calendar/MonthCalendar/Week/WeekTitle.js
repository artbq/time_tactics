import React from "react";

class WeekTitle extends React.Component {
  render() {
    const { weekNumber, width, } = this.props;

    const style = {
      display: "inline-block",
      width: width
    };

    return (
      <div style={style}>Week {weekNumber}</div>
    );
  }
}

export default WeekTitle;
