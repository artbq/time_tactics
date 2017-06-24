class LoginsController < ApplicationController
  before_action :require_logged_out_user

  def new
    @login = Login.new
  end

  def create
    @login = Login.new(login_params)

    if @login.valid?
      self.current_user = @login.user
      redirect_to root_path,
        notice: I18n.t("controllers.logins.actions.create.welcome_back", username: current_user.username)
    else
      render "new"
    end
  end

  private

  def login_params
    params.require(:login).permit(:username, :password)
  end
end
