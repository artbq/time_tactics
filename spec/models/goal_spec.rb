require "rails_helper"

RSpec.describe Goal do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:activity) }

  it { is_expected.to validate_presence_of(:duration) }
  it { is_expected.to validate_numericality_of(:duration).only_integer.is_greater_than(0) }

  it { is_expected.to validate_presence_of(:date) }
end
