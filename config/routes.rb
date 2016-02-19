Rails.application.routes.draw do

  resources :notes

  constraints Clearance::Constraints::SignedOut.new do
    root to: "clearance/sessions#new", as: "outside"
  end

end
