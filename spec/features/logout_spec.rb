require "rails_helper"

RSpec.describe "Logout process" do
  it "can be completed successfully" do
    create(:user, :finn)
    log_in(attributes_for(:login, :finn))
    visit logout_path

    expect(page).to have_current_path(login_path)
    expect(page).not_to have_css(".current_user")
  end
end
