RSpec.shared_examples :action_that_requires_logged_in_user do
  it { is_expected.to redirect_to(login_path) }

  it do
    expected_alert = I18n.t("controllers.application.filters.require_logged_in_user.alert")
    is_expected.to set_flash[:alert].to(expected_alert)
  end
end
