import React from "react";
import PropTypes from "prop-types";

class WeekdayName extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    sideSize: PropTypes.number.isRequired,
  };

  render() {
    const { name, sideSize } = this.props;

    const style = {
      display: "inline-block",
      height: sideSize,
      textAlign: "center",
      width: sideSize,
    };

    return (
      <div style={style}>{name}</div>
    );
  }
}

export default WeekdayName;
