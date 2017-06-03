class Plan < ApplicationRecord
  # def user
  belongs_to :user
  # def plan_activities
  has_many :plan_activities, dependent: :destroy

  validates_presence_of :name, :start, :finish
  validate :start_is_less_than_finish

  private

  def start_is_less_than_finish
    return unless start && finish

    unless start < finish
      errors.add(:base, :start_is_greater_than_or_equal_to_finish)
    end
  end
end
