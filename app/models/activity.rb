class Activity < ApplicationRecord
  COLORS = %w(red orange yellow green blue indigo violet)

  # def user
  belongs_to :user
  # def goals
  has_many :goals, dependent: :destroy
  # def plan_activities
  has_many :plan_activities, dependent: :destroy

  validates_presence_of :name, :color
  validates_inclusion_of :color, in: COLORS
end
