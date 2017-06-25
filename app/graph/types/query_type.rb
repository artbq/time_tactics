module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    description "The query root"

    field :node, GraphQL::Relay::Node.field
    field :nodes, GraphQL::Relay::Node.plural_field

    field :calendar do
      type CalendarType
      argument :spec, !types.String
      resolve ->(obj, args, ctx) do
        # TODO: Raise appropriate error if invalid type or date
        type, date = args["spec"].split("&")
        Calendar.for(type, Time.parse(date))
      end
    end
  end
end
