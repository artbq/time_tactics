RSpec.shared_examples :model_with_username do
  it { is_expected.to validate_presence_of(:username) }

  it { is_expected.to validate_length_of(:username).is_at_most(15) }

  it do
    valid_usernames = ["FinnTheHuman", "jake_the_dog", "marceline9000"]
    is_expected.to allow_values(*valid_usernames).for(:username)
  end

  it do
    invalid_usernames = ["finn the human", "jake.the.dog", "marceline!", "_ice_king_", "princess__bubblegum", "_", "1ady_rainicorn", "42"]
    is_expected.not_to allow_values(*invalid_usernames).for(:username)
  end
end
