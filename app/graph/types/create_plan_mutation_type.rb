require "constants"

module Types
  CreatePlanMutationType = GraphQL::Relay::Mutation.define do
    name "CreatePlan"

    input_field :name, !types.String
    input_field :start, !types.String
    input_field :finish, !types.String
    input_field :calendarType, types.String
    input_field :calendarDate, types.String

    return_field :newPlan, PlanType
    return_field :calendar, CalendarType

    resolve -> (object, inputs, context) do
      new_plan =
        Plan.create!(
          user: User.first,
          name: inputs[:name],
          start: Time.parse(inputs[:start]).utc,
          finish: Time.parse(inputs[:finish]).utc
        )

      calendar_date =
        if inputs[:calendarDate].present?
          Time.parse(inputs[:calendarDate])
        else
          Time.now.utc
        end

      calendar =
        Calendar.for(
          inputs[:calendarType] || Constants::DAY_CALENDAR_TYPE_ID,
          calendar_date
        )

      {newPlan: new_plan, calendar: calendar}
    end
  end
end
