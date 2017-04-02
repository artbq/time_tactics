class Calendar
  def initialize(date)
    @date = date
  end

  def plans
    raise NotImplementedError
  end

  def plan
    plans.first
  end

  private

  attr_reader :date
end
