require "rails_helper"

RSpec.describe PagesController do
  let!(:finn) { create(:user, :finn) }

  describe "#calendar" do
    def send_request
      get "calendar"
    end

    context "when user is logged in" do
      before do
        self.current_user = finn
        send_request
      end

      it { is_expected.to render_template("calendar") }
    end

    context "when user is not logged in" do
      before { send_request }

      it_behaves_like :action_that_requires_logged_in_user
    end
  end
end
