import React from "react";

import WeekTitle from "./Week/WeekTitle";
import Days from "./Week/Days";

class Week extends React.Component {
  render() {
    const { weekNumber, days, changeState } = this.props;

    return (
      <div>
        <WeekTitle weekNumber={weekNumber} />
        <Days days={days} changeState={changeState} />
      </div>
    );
  }
}

export default Week;
