class Calendar
  def initialize(date)
    @date = date
  end

  def plans
    raise NotImplementedError
  end

  def numberOfPlans
    plans.count
  end

  private

  attr_reader :date
end
