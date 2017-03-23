module Types
  CalendarType = GraphQL::ObjectType.define do
    name "Calendar"

    connection :plans, PlanType.connection_type
  end
end
