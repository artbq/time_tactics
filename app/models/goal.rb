class Goal < ApplicationRecord
  # def user
  belongs_to :user
  # def activity
  belongs_to :activity

  validates_presence_of :duration, :date
  validates_numericality_of :duration, only_integer: true, greater_than: 0
end
