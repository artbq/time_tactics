USERNAME_LENGTH =
  ActiveModel::Validations::LengthValidator.new(
    attributes: :username,
    maximum: 15
  )
