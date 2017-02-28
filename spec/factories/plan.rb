FactoryGirl.define do
  factory :plan do
    user

    name "Adventure"
    start { 1.day.from_now }
    finish { start + 1.hour }
  end
end
