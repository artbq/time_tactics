module Types
  CalendarType = GraphQL::ObjectType.define do
    name "Calendar"

    field :plans, PlanType.to_list_type
  end
end
