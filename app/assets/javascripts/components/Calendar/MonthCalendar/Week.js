import React from "react";

import WeekTitle from "./Week/WeekTitle";
import Days from "./Week/Days";

class Week extends React.Component {
  render() {
    const { weekNumber, days, changeState, dayElementSideSize, weekTitleWidth, } = this.props;

    return (
      <div>
        <WeekTitle weekNumber={weekNumber} width={weekTitleWidth} />
        <Days days={days} dayElementSideSize={dayElementSideSize} changeState={changeState} />
      </div>
    );
  }
}

export default Week;
