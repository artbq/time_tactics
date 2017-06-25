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

  describe ".by_day", :skip_database_cleaner do
    subject { described_class.by_day(target_time) }

    let(:target_time) { Time.new(2017, 6, 25, 0, 0, 0, offset) }

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
          start: Time.new(2017, 6, 26, 12, 0, 0, "+03:00"),
          finish: Time.new(2017, 6, 26, 14, 0, 0, "+03:00")
        )

      @plan_4 =
        create(
          :plan,
          user: user_1,
          start: Time.new(2017, 6, 24, 12, 0, 0, "+03:00"),
          finish: Time.new(2017, 6, 25, 14, 0, 0, "+03:00")
        )

      @plan_5 =
        create(
          :plan,
          user: user_1,
          start: Time.new(2017, 6, 25, 12, 0, 0, "+03:00"),
          finish: Time.new(2017, 6, 26, 14, 0, 0, "+03:00")
        )

      @plan_6 =
        create(
          :plan,
          user: user_1,
          start: Time.new(2017, 6, 24, 12, 0, 0, "+03:00"),
          finish: Time.new(2017, 6, 26, 14, 0, 0, "+03:00")
        )

      @plan_7 =
        create(
          :plan,
          user: user_1,
          start: Time.new(2017, 6, 24, 12, 0, 0, "+03:00"),
          finish: Time.new(2017, 6, 25, 1, 0, 0, "+03:00")
        )
    end

    after(:all) do
      DatabaseCleaner.clean
    end

    shared_examples :with_EET_or_UTC_offset do
      it { is_expected.to be_a(ActiveRecord::Relation) }

      it "includes plan that starts and finishes on target date" do
        is_expected.to include(@plan_1)
      end

      it "doesn't include plan that starts and finishes before target date" do
        is_expected.not_to include(@plan_2)
      end

      it "doesn't include plan that starts and finishes after target date" do
        is_expected.not_to include(@plan_3)
      end

      it "includes plan that starts before target date and finishes on target date" do
        is_expected.to include(@plan_4)
      end

      it "includes plan that starts on target date and finishes after target date" do
        is_expected.to include(@plan_5)
      end

      it "includes plan that starts before target date and finishes after target date" do
        is_expected.to include(@plan_6)
      end
    end

    context "with offset = '+03:00'" do
      let(:offset) { "+03:00" }

      include_examples :with_EET_or_UTC_offset

      it "includes plan that start before target date and finishes on target date in EET but before target date in UTC" do
        is_expected.to include(@plan_7)
      end
    end

    context "with offset = '+00:00'" do
      let(:offset) { "+00:00" }

      include_examples :with_EET_or_UTC_offset

      it "doesn't include plan that start before target date and finishes on target date in EET but before target date in UTC" do
        is_expected.not_to include(@plan_7)
      end
    end
  end

  describe ".order_by_start" do
    subject { Plan.order_by_start }

    let!(:user_1) { create(:user) }

    let!(:plan_1) do
      create(
        :plan,
        user: user_1,
        start: Time.new(2017, 6, 25, 12, 0, 0, "+03:00"),
        finish: Time.new(2017, 6, 25, 14, 0, 0, "+03:00")
      )
    end

    let!(:plan_2) do
      create(
        :plan,
        user: user_1,
        start: Time.new(2017, 6, 25, 10, 0, 0, "+03:00"),
        finish: Time.new(2017, 6, 25, 14, 0, 0, "+03:00")
      )
    end

    it "orders plans by start" do
      is_expected.to eq([plan_2, plan_1])
    end
  end
end
