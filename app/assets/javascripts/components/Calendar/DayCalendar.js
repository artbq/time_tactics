import React from "react";
import Relay from "react-relay";
import moment from "moment";

import Plan from "./DayCalendar/Plan";
import CreatePlanMutation from "../../relay/mutations/CreatePlanMutation";

class DayCalendar extends React.Component {
  render() {
    const { date } = this.props;

    const plans =
      this.props.calendar.plans.map(plan => {
        return (<Plan key={plan.__dataID__} plan={plan} referenceDate={date} />);
      });

    const formattedDate = moment.utc(date).format("DD MMMM YYYY");

    return (
      <div>
        <h2>{formattedDate}</h2>

        <input type="text" ref={(input) => { this.nameInput = input }}/><br/>
        <input type="text" ref={(input) => { this.startInput = input }}/><br/>
        <input type="text" ref={(input) => { this.finishInput = input }}/><br/>
        <button onClick={this.handleAddPlanClick.bind(this)}>Add plan</button>

        <div>{plans}</div>
      </div>
    );
  }

  handleAddPlanClick() {
    const mutationArgs = {
      name: this.nameInput.value,
      start: this.startInput.value,
      finish: this.finishInput.value,
      calendarType: "day",
      calendarDate: this.props.date,
      calendarID: this.props.calendar.id
    };

    this.props.relay.commitUpdate(new CreatePlanMutation(mutationArgs));
  }
}

export default Relay.createContainer(DayCalendar, {
  fragments: {
    calendar: () => Relay.QL`
      fragment on Calendar {
        id,
        plans {
          ${Plan.getFragment("plan")}
        }
      }
    `
  }
});
