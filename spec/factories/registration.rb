require_relative "../support/user_credentials"

FactoryGirl.define do
  factory :registration do
    username "candyperson"
    password "str0nk_password!"
    password_confirmation { password }

    trait :finn do
      username USER_CREDENTIALS[:finn][:username]
      password USER_CREDENTIALS[:finn][:password]
    end
  end
end
