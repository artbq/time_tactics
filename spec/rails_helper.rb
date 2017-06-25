ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.infer_spec_type_from_file_location!

  config.filter_rails_from_backtrace!
  # arbitrary gems may also be filtered via:
  # config.filter_gems_from_backtrace("gem name")

  # DatabaseCleaner
  skip_database_cleaner_key = :skip_database_cleaner

  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do |example|
    unless example.metadata[skip_database_cleaner_key]
      DatabaseCleaner.strategy = :transaction
    end
  end

  config.before(:each, type: :feature) do |example|
    unless example.metadata[skip_database_cleaner_key]
      driver_shares_db_connection_with_specs =
        Capybara.current_driver == :rack_test

      if driver_shares_db_connection_with_specs
        DatabaseCleaner.strategy = :transaction
      else
        DatabaseCleaner.strategy = :deletion
      end
    end
  end

  config.before(:each) do |example|
    DatabaseCleaner.start unless example.metadata[skip_database_cleaner_key]
  end

  config.append_after(:each) do |example|
    DatabaseCleaner.clean unless example.metadata[skip_database_cleaner_key]
  end

  config.include FactoryGirl::Syntax::Methods

  config.include ControllerHelpers, type: :controller
  config.include FeatureHelpers, type: :feature
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
