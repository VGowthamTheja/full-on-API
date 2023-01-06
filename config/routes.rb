Rails.application.routes.draw do
  root to: 'pages#index'
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  namespace :api do
    namespace :v1 do
      get 'data/test'
    end
  end

  get '*path', to: "pages#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
