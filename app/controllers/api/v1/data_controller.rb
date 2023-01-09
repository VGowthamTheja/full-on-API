class Api::V1::DataController < ApplicationController

    def users_display
        response = User.users
        render json: { users: response, status: :ok  }
    end

    def supervisors
        response = User.where(role: 'manager').or(User.where(role: 'TL'))

        if response.any?
            render json: { data: response, status: :ok }
        else
            render html: "There are no supervisors"
        end
    end

    def managers
        response = User.managers
        if response.any?
            render json: { data: response, status: :ok }
        else
            render html: "There are no managers"
        end
    end
    
    def admins
        response = User.admins
        if response.any?
            render json: { data: response, status: :ok }
        else
            render html: "There are no admins"
        end
    end

end