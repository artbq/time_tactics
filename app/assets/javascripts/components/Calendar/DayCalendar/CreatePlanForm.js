import React from "react";
import PropTypes from "prop-types";

import CreatePlanMutation from "relay/mutations/CreatePlanMutation";

import FormattedTime from "lib/formatted_time";
import Moment from "lib/moment";

class CreatePlanForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {name: "", start: "", finish: ""};
  }

  static propTypes = {
    relay: PropTypes.object.isRequired,
    date: PropTypes.object.isRequired,
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
        start: FormattedTime.addOffset(this.state.start),
        finish: FormattedTime.addOffset(this.state.finish),
        calendarType: "day",
        calendarDate: Moment.format(this.props.date),
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
