# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'pages#index'
  resources :sessions, only: [:create]

  get '/error', to: 'pages#error' # => 404 Page

  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'
  get :is_admin, to: 'sessions#is_admin'

  get 'projects', to: 'projects#list'
  post 'projects/user/:id/assign', to: 'projects#assign_project_to_user'
  resources :projects

  namespace :admin do
    delete 'registrations/delete', to: 'registrations#delete'
    patch 'registrations/:id/reset_password', to: 'registrations#reset_password'
    resources :registrations, only: %i[index create update]
  end

  namespace :api do
    namespace :v1 do
      get 'data/users_display'
      get 'data/managers'
      get 'data/admins'
      get 'data/supervisors'
      get 'data/:id/projects', to: 'data#projects'
    end
  end

  get '*path', to: 'pages#index', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
