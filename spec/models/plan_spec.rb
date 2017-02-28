require "rails_helper"

RSpec.describe Plan do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to have_many(:plan_activities).dependent(:destroy) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:start) }
  it { is_expected.to validate_presence_of(:finish) }

  it "validates that start is less than finish" do
    plan = build(:plan, start: DateTime.new(2017, 1, 22, 10, 10), finish: DateTime.new(2017, 1, 22, 10))

    expected_error = I18n.t("activerecord.errors.models.plan.attributes.base.start_is_greater_than_or_equal_to_finish")

    expect(plan).not_to be_valid
    expect(plan.errors[:base]).to include(expected_error)

    plan.finish = DateTime.new(2017, 1, 22, 10, 10)

    expect(plan).not_to be_valid
    expect(plan.errors[:base]).to include(expected_error)

    plan.finish = DateTime.new(2017, 1, 22, 10, 20)

    expect(plan).to be_valid
  end
end
