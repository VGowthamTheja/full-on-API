Rails.application.routes.draw do
  root to: 'pages#index'

  namespace :api do
    namespace :v1 do
      get 'data/test'
    end
  end

  get '*path', to: "pages#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
