module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    description "The query root"

    field :plan do
      description "Find a plan by id"
      type PlanType
      argument :id, !types.ID
      resolve ->(obj, args, ctx) { Plan.find(args["id"]) }
    end
  end
end
