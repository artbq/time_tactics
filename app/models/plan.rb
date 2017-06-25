class Plan < ApplicationRecord
  # def user
  belongs_to :user
  # def plan_activities
  has_many :plan_activities, dependent: :destroy

  validates_presence_of :name, :start, :finish
  validate :start_is_less_than_finish

  def self.by_day(date, offset = "+00:00")
    ids =
      all.select do |plan|
        (
          plan.start.localtime(offset) <= date.to_time(:utc).localtime(offset).at_end_of_day &&
          plan.finish.localtime(offset) >= date.to_time(:utc).localtime(offset).at_beginning_of_day
        ) ||
        (
          plan.start.localtime(offset) <= date.to_time(:utc).localtime(offset).at_end_of_day &&
          plan.finish.localtime(offset) >= date.to_time(:utc).localtime(offset).at_beginning_of_day
        )
      end

    where(id: ids)
  end

  def self.order_by_start
    order(:start)
  end

  private

  def start_is_less_than_finish
    return unless start && finish

    unless start < finish
      errors.add(:base, :start_is_greater_than_or_equal_to_finish)
    end
  end
end
