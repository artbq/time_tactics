require_relative "../support/user_credentials"

FactoryGirl.define do
  factory :login do
    username "candyperson"
    password "str0nk_password!"

    trait :finn do
      username USER_CREDENTIALS[:finn][:username]
      password USER_CREDENTIALS[:finn][:password]
    end

    trait :jake do
      username USER_CREDENTIALS[:jake][:username]
      password USER_CREDENTIALS[:jake][:password]
    end
  end
end
