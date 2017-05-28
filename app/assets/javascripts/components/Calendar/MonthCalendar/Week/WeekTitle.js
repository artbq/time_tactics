import React from "react";

class WeekTitle extends React.Component {
  render() {
    const { weekNumber } = this.props;

    const style = {
      display: "inline-block",
      width: 100
    };

    return (
      <div style={style}>Week {weekNumber}</div>
    );
  }
}

export default WeekTitle;
