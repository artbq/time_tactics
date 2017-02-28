require "rails_helper"

RSpec.describe LogoutsController do
  describe "#new" do
    def send_request
      get "new"
    end

    let!(:finn) { create :user, :finn }

    context "when user is logged in" do
      before do
        self.current_user = finn
        send_request
      end

      it "logs user out" do
        expect(current_user).to be_nil
      end

      it { is_expected.to redirect_to(login_path) }

      it do
        expected_notice = I18n.t("controllers.logouts.actions.new.bye", username: finn.username)
        is_expected.to set_flash[:notice].to(expected_notice)
      end
    end

    context "when user is logged out" do
      before { send_request }

      it_behaves_like :action_that_requires_logged_in_user
    end
  end
end
