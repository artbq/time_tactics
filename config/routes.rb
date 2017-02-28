Rails.application.routes.draw do
  root "pages#calendar"

  get "registration", to: "registrations#new", as: "registration"
  resources :registrations, only: :create

  get "login", to: "logins#new", as: "login"
  resources :logins, only: :create

  get "logout", to: "logouts#new", as: "logout"
end
