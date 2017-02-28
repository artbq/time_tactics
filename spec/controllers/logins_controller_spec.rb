require "rails_helper"

RSpec.describe LoginsController do
  let!(:finn) { create(:user, :finn) }
  let!(:jake) { create(:user, :jake) }

  describe "#new" do
    def send_request
      get "new"
    end

    context "when user is logged in" do
      before do
        self.current_user = finn
        send_request
      end

      it_behaves_like :action_that_requires_logged_out_user
    end

    context "when user is logged out" do
      before { send_request }

      it { is_expected.to render_template("new") }
    end
  end

  describe "#create" do
    def send_request
      post "create", params: { login: login_params }
    end

    let(:login_params) { attributes_for(:login, :finn) }

    context "when user is logged in" do
      before do
        self.current_user = finn
        send_request
      end

      it_behaves_like :action_that_requires_logged_out_user
    end

    context "when user is logged out" do
      context "when login is valid" do
        before { send_request }

        it "logs user in" do
          expect(current_user).to eq(finn)
        end

        it { is_expected.to redirect_to(root_path) }

        it do
          expected_notice = I18n.t("controllers.logins.actions.create.welcome_back", username: finn.username)
          is_expected.to set_flash[:notice].to(expected_notice)
        end
      end

      context "when login is invalid" do
        let(:login_params) { attributes_for(:login, :finn, password: "does_not_match") }

        before { send_request }

        it "doesn't log user in" do
          expect(current_user).to be_nil
        end

        it { is_expected.to render_template("new") }
      end
    end
  end
end
