require "rails_helper"

RSpec.describe User do
  subject { build(:user) }

  it_behaves_like :model_with_username

  it { is_expected.to have_many(:activities).dependent(:destroy) }
  it { is_expected.to have_many(:goals).dependent(:destroy) }
  it { is_expected.to have_many(:plans).dependent(:destroy) }

  it { is_expected.to validate_uniqueness_of(:username).case_insensitive }
  it { is_expected.to validate_presence_of(:encrypted_password) }
end
