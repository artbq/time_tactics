require "rails_helper"

RSpec.describe Registration, type: :model do
  it_behaves_like :model_with_username

  it { is_expected.to validate_presence_of(:password) }

  it { is_expected.to validate_length_of(:password).is_at_least(8) }

  it "validates that username isn't taken" do
    create(:user, :finn)

    registration = build(:registration, :finn)
    registration.username = registration.username.upcase

    registration.valid?
    expect(registration.errors[:username]).to include(I18n.t("errors.messages.taken"))

    registration.username = "JakeTheDog"

    expect(registration).to be_valid
  end

  it "validates that password matches confirmation" do
    registration = build(:registration, :finn, password_confirmation: "does_not_match")

    registration.valid?
    expected_error = I18n.t("activemodel.errors.models.registration.attributes.base.password_does_not_match_confirmation")
    expect(registration.errors[:base]).to include(expected_error)

    registration.password_confirmation = USER_CREDENTIALS[:finn][:password]

    expect(registration).to be_valid
  end
end
