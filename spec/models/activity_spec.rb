require "rails_helper"

RSpec.describe Activity do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to have_many(:goals).dependent(:destroy) }
  it { is_expected.to have_many(:plan_activities).dependent(:destroy) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:color) }
  it { is_expected.to validate_inclusion_of(:color).in_array(Activity::COLORS) }
end
