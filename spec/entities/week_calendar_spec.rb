require "rails_helper"

RSpec.describe WeekCalendar do
  describe "#plans" do
    subject(:plans) { described_class.new(this_monday).plans }

    let!(:adventure_on_past_saturday) do
      create(
        :plan,
        start: this_monday - (1.day + 12.hours),
        finish: this_monday - (1.day + 11.hours),
        name: "Adventure on past Saturday"
      )
    end
    let!(:adventure_on_past_saturday_and_sunday) do
      create(
        :plan,
        start: this_monday - (1.day + 12.hours),
        finish: this_monday - 12.hours,
        name: "Adventure on past Saturday and Sunday"
      )
    end
    let!(:adventure_on_past_sunday_and_this_monday) do
      create(
        :plan,
        start: this_monday - 12.hours,
        finish: this_monday + 12.hours,
        name: "Adventure on past Sunday and this Monday"
      )
    end
    let!(:adventure_on_this_tuesday) do
      create(
        :plan,
        start: this_monday + 1.day,
        finish: this_monday + 1.day + 12.hours,
        name: "Adventure on this Tuesday"
      )
    end
    let!(:adventure_since_this_sunday_till_next_tuesday) do
      create(
        :plan,
        start: this_monday + 6.days,
        finish: this_monday + 8.days,
        name: "Adventure since this Sunday till next Tuesday"
      )
    end
    let!(:adventure_on_next_wednesday) do
      create(
        :plan,
        start: this_monday + 9.days,
        finish: this_monday + 9.days + 12.hours,
        name: "Adventure on next Wednesday"
      )
    end
    let!(:adventure_forever) do
      create(:plan, start: this_monday - 6.months, finish: this_monday + 6.months, name: "Adventure FOREVER!")
    end

    let(:this_monday) { Time.new(2017, 5, 29) }

    it "returns all plans happening during given date's week" do
      expected_plans = [
        adventure_forever,
        adventure_on_past_sunday_and_this_monday,
        adventure_on_this_tuesday,
        adventure_since_this_sunday_till_next_tuesday
      ]

      is_expected.to eq(expected_plans)
    end
  end
end
