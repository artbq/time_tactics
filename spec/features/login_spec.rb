require "rails_helper"

RSpec.describe "Login process" do
  before { create(:user, :finn) }

  it "can be completed successfully" do
    form_data = attributes_for(:login, :finn)
    log_in(form_data)

    expect(page).to have_current_path(root_path)
    expected_notice = I18n.t("controllers.logins.actions.create.welcome_back", username: form_data[:username])
    expect(page.find(".notice")).to have_content(expected_notice)
    expect(page.find(".current_user .username")).to have_content(form_data[:username])
  end

  it "can fail" do
    form_data = attributes_for(:login, :finn, password: "does_not_match")
    log_in(form_data)

    expect(page).to have_current_path(logins_path)
    expect(page).to have_css(".errors")
  end
end
