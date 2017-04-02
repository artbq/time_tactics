import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";

class Plan extends React.Component {
  render() {
    var plan = this.props.plan;
    return (
      <div>
        <span>{plan.name}</span><br />
        <span>{plan.start}</span> - <span>{plan.finish}</span>
      </div>
    );
  }
}

const PlanContainer = Relay.createContainer(Plan, {
  fragments: {
    plan: () => Relay.QL`
      fragment on Plan {
        name,
        start,
        finish
      }
    `
  }
});

class Calendar extends React.Component {
  render() {
    var calendar = this.props.calendar;
    return (
      <PlanContainer plan={calendar.plan} />
    );
  }
}

const CalendarContainer =  Relay.createContainer(Calendar, {
  fragments: {
    calendar: () => Relay.QL`
      fragment on Calendar {
        plan {
          ${PlanContainer.getFragment('plan')}
        }
      }
    `
  }
});

class CalendarRoute extends Relay.Route {
  static queries = {
    calendar: () => Relay.QL`
      query { calendar(date: $date) }
    `
  };

  static paramDefinitions = {
    date: {required: true}
  };

  static routeName = "Calendar";
}

const calendarRoute = new CalendarRoute({date: "2017-3-15"});

window.onload = function() {
  const calendarAppContainer = document.getElementById("calendar_app");
  if (calendarAppContainer) {
    ReactDOM.render(
      <Relay.RootContainer Component={CalendarContainer} route={calendarRoute} />,
      calendarAppContainer
    );
  }
}
