class LogoutsController < ApplicationController
  before_action :require_logged_in_user

  def new
    user = current_user
    self.current_user = nil
    redirect_to login_path,
      notice: I18n.t("controllers.logouts.actions.new.bye", username: user.username)
  end
end
