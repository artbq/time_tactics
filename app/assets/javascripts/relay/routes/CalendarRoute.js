import Relay from "react-relay";

class CalendarRoute extends Relay.Route {
  static queries = {
    calendar: () => Relay.QL`
      query { calendar(spec: $spec) }
    `,
  };

  static paramDefinitions = {
    spec: {required: true},
  };

  static routeName = "Calendar";
}

export default CalendarRoute;
