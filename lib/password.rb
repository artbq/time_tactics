class Password
  def initialize(password)
    @password = password
  end

  def encrypt
    BCrypt::Password.create(password)
  end

  def matches?(encrypted_password)
    BCrypt::Password.new(encrypted_password) == password
  end

  private

  # def password
  attr_reader :password
end
