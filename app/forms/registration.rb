class Registration < ApplicationForm
  # def username
  # def username=
  # def password
  # def password=
  # def password_confirmation
  # def password_confirmation=
  attr_accessor :username, :password, :password_confirmation

  validates_presence_of :username, :password
  validate USERNAME_LENGTH
  validate USERNAME_FORMAT
  validates_length_of :password, minimum: 8
  validate :username_is_not_taken!
  validate :password_matches_confirmation!

  private

  def username_is_not_taken!
    return if username.blank?

    errors.add(:username, :taken) if User.find_by_username(username)
  end

  def password_matches_confirmation!
    return if password.blank?

    unless password == password_confirmation
      errors.add(:base, :password_does_not_match_confirmation)
    end
  end
end
