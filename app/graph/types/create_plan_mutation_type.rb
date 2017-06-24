module Types
  CreatePlanMutationType = GraphQL::Relay::Mutation.define do
    name "CreatePlan"

    input_field :name, !types.String
    input_field :start, !types.String
    input_field :finish, !types.String
    input_field :calendarType, !types.String
    input_field :calendarDate, !types.String

    return_field :newPlan, PlanType
    return_field :calendar, CalendarType

    resolve -> (object, inputs, context) do
      new_plan = Plan.create!(user: User.first, name: inputs[:name], start: inputs[:start], finish: inputs[:finish])
      calendar = Calendar.for(inputs[:calendarType], Time.parse(inputs[:calendarDate]))

      {newPlan: new_plan, calendar: calendar}
    end
  end
end
