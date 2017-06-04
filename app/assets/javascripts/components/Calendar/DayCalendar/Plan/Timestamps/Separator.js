import React from "react";
import PropTypes from "prop-types";

class Separator extends React.Component {
  static propTypes = {};

  style() {
    return {
      display: "inline-block"
    };
  }

  render() {
    return (
      <div style={this.style()}>&nbsp;-&nbsp;</div>
    );
  }
}

export default Separator;
