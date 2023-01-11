class Admin::RegistrationsController < ApplicationController
    def create
        user = User.create(
            email: params['user']["email"],
            password: 'i04x%1REo',
            password_confirmation: 'i04x%1REo',
            role: params['user']["role"],
            manager_id: params['user']["manager"],
            user_name: params['user']["firstname"]+" "+params['user']["lastname"],
        )

        if user
            render json: { status: :created, user: user }
        else
            render json: { status: :unprocessable_entity }
        end
    end

    def update
        user = User.find_by(id: params[:id])
        if user
            if user.update(user_name: params['user']["firstname"]+" "+params['user']["lastname"], address: params['user']["address"], dob: params['user']["dob"])
                render json: { data: {}, status: :ok }
            else
                render json: { data: {}, status: :unprocessable_entity }
            end
        else
            render json: { data: {}, status: :unprocessable_entity }
        end
    end

    def is_admin
        user = User.find_by(id: params[:id])
        if user && user.admin?
            render json: { status: :ok }
        else
            render json: { status: :forbidden }
        end
    end

    def reset_password
        user = User
                .find_by(id: params[:id])
                .try(:authenticate, params["user"]["current_password"])
        if user
            if user.update(password: params['user']['password'], password_confirmation: params['user']['password_confirmation'])
                render json: { status: :ok, message: "Password updated successfully" }
            else
                render json: { status: :unprocessable_entity }
            end
        else
            render json: { status: :not_found, message: "Something went wrong while authenticating." }
        end
    end
end