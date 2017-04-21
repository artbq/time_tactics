import React from "react";

import WeekTitle from "./Week/WeekTitle";
import Days from "./Week/Days";

class Week extends React.Component {
  render() {
    const { weekNumber, days } = this.props;

    return (
      <div>
        <WeekTitle weekNumber={weekNumber} />
        <Days days={days} />
      </div>
    );
  }
}

export default Week;
