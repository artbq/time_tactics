module Types
  CalendarType = GraphQL::ObjectType.define do
    name "Calendar"

    implements GraphQL::Relay::Node.interface

    global_id_field :id
    field :plans, PlanType.to_list_type
    field :number_of_plans, !types.Int
  end
end
