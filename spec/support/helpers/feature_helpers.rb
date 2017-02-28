module FeatureHelpers
  def log_in(form_data)
    visit login_path
    fill_in "Username", with: form_data[:username]
    fill_in "Password", with: form_data[:password]
    click_button("Log in")
  end
end
