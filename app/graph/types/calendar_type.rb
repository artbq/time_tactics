module Types
  CalendarType = GraphQL::ObjectType.define do
    name "Calendar"

    connection :plans, PlanType.connection_type

    field :plan, PlanType
  end
end
