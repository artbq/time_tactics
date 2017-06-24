class WeekCalendar < Calendar
  def plans
    # TODO: Use SQL
    Plan.all.select do |plan|
      (plan.start.to_date <= date.beginning_of_week && plan.finish.to_date >= date.beginning_of_week) ||
      (plan.start.to_date > date.beginning_of_week && plan.start.to_date < date.end_of_week)
    end.sort_by(&:start)
  end
end
