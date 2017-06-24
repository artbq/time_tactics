class MonthCalendar < Calendar
  def plans
    # TODO: Use SQL
    Plan.all.select do |plan|
      (plan.start.to_date <= date.beginning_of_month && plan.finish.to_date >= date.beginning_of_month) ||
      (plan.start.to_date > date.beginning_of_month && plan.start.to_date < date.end_of_month)
    end.sort_by(&:start)
  end
end
