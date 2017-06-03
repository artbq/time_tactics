require "constants"

class Calendar
  CALENDAR_TYPE_ID_TO_CALENDAR_CLASS_MAP = {
    Constants::DAY_CALENDAR_TYPE_ID => DayCalendar,
    Constants::WEEK_CALENDAR_TYPE_ID => WeekCalendar,
    Constants::MONTH_CALENDAR_TYPE_ID => MonthCalendar
  }

  def self.for(type, date)
    CALENDAR_TYPE_ID_TO_CALENDAR_CLASS_MAP.fetch(type).new(date)
  end

  def initialize(date)
    @date = date
  end

  def plans
    raise NotImplementedError
  end

  def number_of_plans
    plans.count
  end

  private

  attr_reader :date
end
