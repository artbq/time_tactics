source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem "rails", "~> 5.0.1"
gem "pg", "~> 0.18"
gem "puma", "~> 3.0"
# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 3.0"
gem "bcrypt", "~> 3.1.7"

# Use Capistrano for deployment
# gem "capistrano-rails", group: :development

group :development, :test do
  gem "rspec-rails", "~> 3.5"
  gem "factory_girl_rails", "~> 4.8"
  gem "pry-rails", "~> 0.3.4"
end

group :test do
  gem "shoulda-matchers", "~> 3.1"
  gem "rails-controller-testing", "~> 1.0"
  gem "capybara", "~> 2.11"
  gem "database_cleaner"
end

gem "graphql"
