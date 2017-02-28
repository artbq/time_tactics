USERNAME_FORMAT =
  ActiveModel::Validations::FormatValidator.new(
    attributes: :username,
    with: /\A[a-z]+(_?[a-z0-9]*)*\z/i
  )
