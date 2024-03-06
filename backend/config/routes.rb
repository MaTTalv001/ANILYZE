Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :works, only: [:index, :show]
      resources :people, only: [:index, :show] do
        member do
          get 'works_by_year'
          get 'co_actors'
        end
      end
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
