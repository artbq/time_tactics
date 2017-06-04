import React from "react";
import PropTypes from "prop-types";

class Name extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  style() {
    return {};
  }

  render() {
    return (
      <div style={this.style()}>{this.name()}</div>
    );
  }

  name() {
    return this.props.name;
  }
}

export default Name;
