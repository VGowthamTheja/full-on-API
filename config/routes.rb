Rails.application.routes.draw do
  root to: 'pages#index'
  resources :sessions, only: [:create]
  
  get '/error', to: 'pages#error' # => 404 Page

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  get :is_admin, to: "sessions#is_admin"

  get 'projects', to: 'projects#list'
  resources :projects
  
  namespace :admin do
    resources :registrations, only: [:create]
  end

  namespace :api do
    namespace :v1 do
      get 'data/users_display'
      get 'data/managers'
      get 'data/admins'
      get 'data/supervisors'
    end
  end

  get '*path', to: "pages#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end


end
