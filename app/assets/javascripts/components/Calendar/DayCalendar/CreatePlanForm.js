import React from "react";
import PropTypes from "prop-types";

import CreatePlanMutation from "relay/mutations/CreatePlanMutation";
import TimeString from "time_string";

class CreatePlanForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {name: "", start: "", finish: ""};
  }

  static propTypes = {
    relay: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    calendarID: PropTypes.string.isRequired
  };

  style() {
    return {

    };
  }

  render() {
    return (
      <div style={this.style()}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={this.changeHandler("name")}
          />
          <br/>

          <label htmlFor="start">Start</label>
          <input
            id="start"
            type="datetime-local"
            value={this.state.start}
            onChange={this.changeHandler("start")}
          />
          <br/>

          <label htmlFor="finish">Finish</label>
          <input
            id="finish"
            type="datetime-local"
            value={this.state.finish}
            onChange={this.changeHandler("finish")}
          />
          <br/>

          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }

  changeHandler(field) {
    const handler =
      (event) => {
        this.setState({[field]: event.target.value});
      };

    return handler;
  }

  handleSubmit(event) {
    const mutationInput =
      {
        name: this.state.name,
        start: TimeString.addOffset(this.state.start),
        finish: TimeString.addOffset(this.state.finish),
        calendarType: "day",
        calendarDate: this.props.date,
        calendarID: this.props.calendarID
      };

    const mutation = new CreatePlanMutation(mutationInput)

    const onFailure = () => { alert("Something went wrong :-("); }

    const onSuccess =
      () => { this.setState({name: "", start: "", finish: ""}) };

    this.props.relay.commitUpdate(mutation, {onFailure, onSuccess});

    event.preventDefault();
  }
}

export default CreatePlanForm;
