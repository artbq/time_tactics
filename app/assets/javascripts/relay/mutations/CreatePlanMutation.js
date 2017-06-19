import Relay from "react-relay";

class CreatePlanMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {createPlan}`;
  }

  getVariables() {
    return {
      name: this.props.name,
      start: this.props.start,
      finish: this.props.finish,
      calendarType: this.props.calendarType,
      calendarDate: this.props.calendarDate
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreatePlanPayload {
        calendar {
          plans
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        calendar: this.props.calendarID
      }
    }];
  }
}

export default CreatePlanMutation;
