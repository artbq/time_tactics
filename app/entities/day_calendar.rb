class DayCalendar < Calendar
  def plans
    # TODO: Use SQL; specs
    Plan.all.select do |plan|
      plan.start.to_date <= date.to_date && plan.finish.to_date >= date.to_date
    end.sort_by(&:start)
  end
end
