class SessionManager
  def initialize(session)
    @session = session
  end

  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||=
      if (id = session[:current_user_id])
        User.find(id)
      end
  end

  def current_user=(user)
    if user
      session[:current_user_id] = user.id
      @current_user = user
    else
      @current_user = session[:current_user_id] = nil
    end
  end

  private

  # def session
  attr_reader :session
end
