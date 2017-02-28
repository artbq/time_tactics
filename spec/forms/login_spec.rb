require "rails_helper"

RSpec.describe Login, type: :model do
  let!(:finn) { create :user, :finn }

  it { is_expected.to validate_presence_of(:username) }

  it { is_expected.to validate_presence_of(:password) }

  it "validates that user exists" do
    login = build :login, :finn, username: ""

    expect(login).not_to be_valid

    login.username = "jake"

    login.valid?
    expected_error = I18n.t("activemodel.errors.models.login.attributes.username.user_does_not_exist")
    expect(login.errors[:username]).to include(expected_error)

    login.username = finn.username

    expect(login).to be_valid
  end

  it "validates password" do
    login = build :login, :finn, password: ""

    expect(login).not_to be_valid

    login.password = "does_not_match"

    login.valid?
    expected_error = I18n.t("errors.messages.invalid")
    expect(login.errors[:password]).to include(expected_error)

    login.password = "Math3matical!"

    expect(login).to be_valid
  end
end
