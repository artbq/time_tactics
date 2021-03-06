require "constants"

class Calendar
  CALENDAR_TYPE_ID_TO_CALENDAR_CLASS_MAP = {
    Constants::DAY_CALENDAR_TYPE_ID => "DayCalendar",
    Constants::WEEK_CALENDAR_TYPE_ID => "WeekCalendar",
    Constants::MONTH_CALENDAR_TYPE_ID => "MonthCalendar"
  }

  # TODO: Is there something better?
  def self.for(type, date)
    CALENDAR_TYPE_ID_TO_CALENDAR_CLASS_MAP.fetch(type).constantize.new(date)
  end

  def initialize(date)
    @date = date
  end

  def id
    "#{type}&#{date.iso8601}"
  end

  def type
    CALENDAR_TYPE_ID_TO_CALENDAR_CLASS_MAP.key(self.class.name)
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
