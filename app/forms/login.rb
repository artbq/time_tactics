require "password"

class Login < ApplicationForm
  # def password
  # def password=
  attr_accessor :password
  # def user
  # def username
  attr_reader :user, :username

  validates_presence_of :username, :password
  validate :user_exists
  validate :password_is_valid

  def username=(username)
    @username = username
    @user = User.find_by_username(username)
  end

  private

  def user_exists
    return if username.blank?

    errors.add(:username, :user_does_not_exist) unless user
  end

  def password_is_valid
    return unless user && password.present?

    unless Password.new(password).matches?(user.encrypted_password)
      errors.add(:password, :invalid)
    end
  end
end
