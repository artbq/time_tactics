require "rails_helper"

RSpec.describe "Registration process" do
  def register(form_data)
    visit registration_path
    fill_in "Username", with: form_data[:username]
    fill_in "Password", with: form_data[:password]
    fill_in "Password confirmation", with: form_data[:password_confirmation]
    click_button("Register")
  end

  it "can be completed successfully" do
    form_data = attributes_for(:registration, :finn)
    register(form_data)

    expect(page).to have_current_path(root_path)
    expected_notice = I18n.t("controllers.registrations.actions.create.welcome", username: form_data[:username])
    expect(page.find(".notice")).to have_content(expected_notice)
    expect(page.find(".current_user .username")).to have_content(form_data[:username])
  end

  it "can fail" do
    form_data = attributes_for(:registration, :finn, password_confirmation: "does_not_match")
    register(form_data)

    expect(page).to have_current_path(registrations_path)
    expect(page).to have_css(".errors")
  end
end
