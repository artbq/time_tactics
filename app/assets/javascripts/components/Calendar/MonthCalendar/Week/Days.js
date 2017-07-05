import React from "react";

import Day from "./Days/Day";

class Days extends React.Component {
  render() {
    const { days, dayElementSideSize, navigateToAnotherCalendar } = this.props;

    const dayElements = days.map(day => {
      return (<Day key={day.date} {...day} sideSize={dayElementSideSize} navigateToAnotherCalendar={navigateToAnotherCalendar} />);
    });

    const style = {
      display: "inline"
    };

    return (
      <div style={style}>{dayElements}</div>
    );
  }
}

export default Days;
