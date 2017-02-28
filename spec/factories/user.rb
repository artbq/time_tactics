require "password"
require_relative "../support/user_credentials"

FactoryGirl.define do
  factory :user do
    sequence(:username) { |n| "candyperson#{n}" }
    encrypted_password { Password.new(password).encrypt }

    transient do
      password "str0nk_password!"
    end

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
