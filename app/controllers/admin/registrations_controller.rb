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

    def is_admin
        user = User.find_by(id: params[:id])
        if user && user.admin?
            render json: { status: :ok }
        else
            render json: { status: :forbidden }
        end
    end
end