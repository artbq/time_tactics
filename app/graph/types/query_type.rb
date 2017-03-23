module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    description "The query root"

    field :node, GraphQL::Relay::Node.field
    field :nodes, GraphQL::Relay::Node.plural_field

    field :calendar do
      type CalendarType
      argument :date, !types.String
      resolve ->(obj, args, ctx) { DayCalendar.new(Date.parse(args["date"])) }
    end
  end
end
