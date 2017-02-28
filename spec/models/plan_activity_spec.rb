require "rails_helper"

RSpec.describe PlanActivity do
  it { is_expected.to belong_to(:plan) }
  it { is_expected.to belong_to(:activity) }
end
