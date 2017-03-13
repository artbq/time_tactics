module Types
  PlanType = GraphQL::ObjectType.define do
    name "Plan"
    description "A plan to do something"
    field :id, !types.ID
    field :name, !types.String
    field :start, !types.String
    field :finish, !types.String
  end
end
