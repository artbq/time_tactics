class User < ApplicationRecord
  # def activities
  has_many :activities, dependent: :destroy
  # def goals
  has_many :goals, dependent: :destroy
  # def plans
  has_many :plans, dependent: :destroy

  validates_presence_of :username, :encrypted_password
  validates_uniqueness_of :username, case_sensitive: false
  validate USERNAME_LENGTH
  validate USERNAME_FORMAT

  def self.find_by_username(username)
    User.where("lower(username) = ?", username.to_s.downcase).first
  end
end
