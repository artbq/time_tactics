require "rails_helper"

RSpec.describe DayCalendar do
  let(:calendar) { described_class.new(target_date) }
  let(:target_date) { Date.new(2017, 6, 25) }

  describe ".plans", :skip_database_cleaner do
    subject { calendar.plans }

    before(:all) do
      DatabaseCleaner.strategy = :transaction
      DatabaseCleaner.start

      user_1 = create(:user)

      @plan_1 =
        create(
          :plan,
          user: user_1,
          start: Time.new(2017, 6, 25, 12, 0, 0, "+03:00"),
          finish: Time.new(2017, 6, 25, 14, 0, 0, "+03:00")
        )

      @plan_2 =
        create(
          :plan,
          user: user_1,
          start: Time.new(2017, 6, 24, 12, 0, 0, "+03:00"),
          finish: Time.new(2017, 6, 24, 14, 0, 0, "+03:00")
        )

      @plan_3 =
        create(
          :plan,
          user: user_1,
          start: Time.new(2017, 6, 25, 10, 0, 0, "+03:00"),
          finish: Time.new(2017, 6, 25, 14, 0, 0, "+03:00")
        )
    end

    after(:all) do
      DatabaseCleaner.clean
    end

    it "includes plans that belong to target date" do
      is_expected.to include(@plan_1, @plan_3)
    end

    it "doesn't include plans that don't belong to target date" do
      is_expected.not_to include(@plan_2)
    end

    it "sorts plans by start" do
      plans = subject
      plan_pairs = plans.zip(plans.drop(1))[0...-1]

      plan_pairs.each do |plan_a, plan_b|
        expect(plan_a.start).to be <= plan_b.start
      end
    end
  end
end
