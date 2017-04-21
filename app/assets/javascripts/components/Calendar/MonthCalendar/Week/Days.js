import React from "react";

import Day from "./Days/Day";

class Days extends React.Component {
  render() {
    const { days } = this.props;

    const dayElements = days.map(day => {
      return (<Day key={day.date} {...day} />);
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
