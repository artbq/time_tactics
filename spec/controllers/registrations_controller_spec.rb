require "rails_helper"

RSpec.describe RegistrationsController do
  let!(:jake) { create(:user, :jake) }

  describe "#new" do
    def send_request
      get "new"
    end

    context "when user is logged in" do
      before do
        self.current_user = jake
        send_request
      end

      it_behaves_like :action_that_requires_logged_out_user
    end

    context "when user is logged out" do
      before { send_request }

      it do
        is_expected.to render_template("new")
      end
    end
  end

  describe "#create" do
    def send_request
      post "create", params: params
    end

    let(:params) { { registration: registration_params } }
    let(:registration_params) { attributes_for(:registration, :finn) }

    context "when user is logged in" do
      before do
        self.current_user = jake
        send_request
      end

      it_behaves_like :action_that_requires_logged_out_user
    end

    context "when user is logged out" do
      context "when registration is valid" do
        before { send_request }

        it { is_expected.to redirect_to(root_path) }

        it do
          expected_notice = I18n.t("controllers.registrations.actions.create.welcome", username: registration_params[:username])
          is_expected.to set_flash[:notice].to(expected_notice)
        end

        it "logs registered user in" do
          expect(current_user.username).to eq(registration_params[:username])
        end
      end

      context "when registration is invalid" do
        let(:registration_params) { attributes_for(:registration, :finn, password_confirmation: "does_not_match") }

        before { send_request }

        it { is_expected.to render_template("new") }
      end
    end
  end
end
