GraphSchema = GraphQL::Schema.define do
  query Types::QueryType
  mutation Types::MutationType

  id_from_object ->(object, type_definition, query_ctx) {
    GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  }

  object_from_id ->(id, query_ctx) {
    type_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)

    case type_name
    when "Calendar"
      calendar_type, calendar_date = item_id.split("&")
      Calendar.for(calendar_type, Time.parse(calendar_date))
    else
      type_name.constantize.find(item_id)
    end
  }

  resolve_type ->(obj, ctx) {
    case obj
    when Plan then Types::PlanType
    when DayCalendar, WeekCalendar, MonthCalendar then Types::CalendarType
    else
      raise "Unexpected object: #{obj.inspect}"
    end
  }
end
