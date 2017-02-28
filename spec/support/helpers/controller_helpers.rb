module ControllerHelpers
  def self.included(includer)
    includer.delegate :current_user, :current_user=, to: :session_manager
  end

  def session_manager
    SessionManager.new(session)
  end
end
