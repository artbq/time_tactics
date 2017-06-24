module Types
  PlanType = GraphQL::ObjectType.define do
    name "Plan"
    description "A plan to do something"

    implements GraphQL::Relay::Node.interface

    global_id_field :id
    field :name, !types.String
    field :start, !types.String
    field :finish, !types.String
  end
end
