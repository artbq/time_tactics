class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :logged_in?, :current_user

  private

  # def logged_in?
  # def current_user
  # def current_user=
  private *(
    delegate :logged_in?, :current_user, :current_user=, to: :session_manager
  )

  def require_logged_in_user
    unless logged_in?
      redirect_to login_path,
        alert: I18n.t("controllers.application.filters.require_logged_in_user.alert")
    end
  end

  def require_logged_out_user
    if logged_in?
      redirect_to root_path,
        alert: I18n.t("controllers.application.filters.require_logged_out_user.alert")
    end
  end

  def session_manager
    @session_manager ||= SessionManager.new(session)
  end
end
