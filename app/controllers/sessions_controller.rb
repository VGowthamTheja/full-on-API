class SessionsController < ApplicationController
    include CurrentUserConcern

    def create
        user = User
                .find_by(email: params["user"]["email"])
                .try(:authenticate, params["user"]["password"])
        if user
            session[:user_id] = user.id
            render json: { user: user, status: :created, logged_in: true}
            # redirect_to root_path
        else
            render json: { status: 401, logged_in: false }
        end
    end

    def logged_in
        if @current_user
            render json: { user: @current_user, logged_in: true }
        else
            render json: { logged_in: false }
        end
    end

    def logout
        reset_session
        render json: { status: 200, logged_out: true }
    end
end