import React from "react";
import PropTypes from "prop-types";

import WeekdayName from "./WeekdayNames/WeekdayName";

class WeekdayNames extends React.Component {
  static propTypes = {
    weekdayElementSideSize: PropTypes.number.isRequired,
    marginLeft: PropTypes.number.isRequired,
  };

  render() {
    const { weekdayElementSideSize, marginLeft } = this.props;

    const weekdayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const weekdayNameElements = weekdayNames.map(name => {
      return (<WeekdayName key={name} name={name} sideSize={weekdayElementSideSize} />);
    });

    const style = {
      marginLeft: marginLeft,
    };

    return (
      <div style={style}>{weekdayNameElements}</div>
    );
  }
}

export default WeekdayNames;
