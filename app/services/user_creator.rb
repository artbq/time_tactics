require "password"

class UserCreator
  def initialize(user_form)
    @user_form = user_form
  end

  def call
    User.create!(username: username, encrypted_password: encrypted_password)
  end

  private

  # def user_form
  attr_reader :user_form

  # def username
  # def password
  private *(delegate :username, :password, to: :user_form)

  def encrypted_password
    Password.new(password).encrypt
  end
end
