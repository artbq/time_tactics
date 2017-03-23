class DayCalendar < Calendar
  def plans
    interval = date..(date + 1)
    query = Plan.arel_table[:start].in(interval).or(Plan.arel_table[:finish].in(interval))
    Plan.where(query)
  end
end
