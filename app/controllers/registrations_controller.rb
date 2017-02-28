class RegistrationsController < ApplicationController
  before_action :require_logged_out_user

  def new
    @registration = Registration.new
  end

  def create
    @registration = Registration.new(registration_params)

    if @registration.valid?
      user = UserCreator.new(@registration).call
      self.current_user = user
      redirect_to root_path,
        notice: I18n.t("controllers.registrations.actions.create.welcome", username: user.username)
    else
      render "new"
    end
  end

  private

  def registration_params
    params
      .require(:registration)
      .permit(:username, :password, :password_confirmation)
  end
end
