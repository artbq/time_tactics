import React from "react";

import WeekTitle from "./Week/WeekTitle";
import Days from "./Week/Days";

class Week extends React.Component {
  render() {
    const { weekNumber, days, navigateToAnotherCalendar, dayElementSideSize, weekTitleWidth, } = this.props;

    return (
      <div>
        <WeekTitle weekNumber={weekNumber} width={weekTitleWidth} />
        <Days days={days} dayElementSideSize={dayElementSideSize} navigateToAnotherCalendar={navigateToAnotherCalendar} />
      </div>
    );
  }
}

export default Week;
