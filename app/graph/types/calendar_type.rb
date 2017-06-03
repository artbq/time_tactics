module Types
  CalendarType = GraphQL::ObjectType.define do
    name "Calendar"

    field :plans, PlanType.to_list_type
    field :number_of_plans, !types.Int
  end
end
