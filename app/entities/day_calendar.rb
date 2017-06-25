class DayCalendar < Calendar
  def plans
    Plan.by_day(date).order_by_start
  end
end
