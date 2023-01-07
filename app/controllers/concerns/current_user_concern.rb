module CurrentUserConcern
    extend ActiveSupport::Concern

    included do
      before_action :set_current_user
    end

    def set_current_user
        user = User.find_by(id: session[:user_id])

        if user && session[:user_id]
            puts "Setting current user to #{session[:user_id]}"
            @current_user = User.find(session[:user_id])
        else
            session = nil
        end
    end
end