class Api::V1::DataController < ApplicationController

    def users_display
        sql = "select * from users where role != 'admin' and role != 'manager'"
        record = ActiveRecord::Base.connection.execute(sql)
        if record
            render json: { data: record, status: :ok  }
        else
            render json: { data: record, status: :not_found }
        end
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

    def projects
        user = User.find_by(id: params[:id])

        if user
            render json: { data: user.projects, status: :found }
        else
            render json: { data: {}, status: :not_found}
        end
    end

end