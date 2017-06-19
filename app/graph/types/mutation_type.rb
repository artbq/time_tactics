module Types
  MutationType = GraphQL::ObjectType.define do
    name "Mutation"

    field :createPlan, CreatePlanMutationType.field
  end
end
