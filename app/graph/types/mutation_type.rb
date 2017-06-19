module Types
  MutationType = GraphQL::ObjectType.define do
    name "Mutation"

    field :createPlan, PlanType do
      description "Creates a new plan"
      argument :name, !types.String
      argument :start, !types.String
      argument :finish, !types.String

      resolve -> (o, args, c) {
        Plan.create!(user: User.first, name: args[:name], start: args[:start], finish: args[:finish])
      }
    end
  end
end
