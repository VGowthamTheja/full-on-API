class ProjectsController < ApplicationController
    def list
        projects = Project.all
        if projects
            render json: { data: projects, status: :found }
        else
            render json: { status: :not_found }
        end
    end

    def create

    end
end