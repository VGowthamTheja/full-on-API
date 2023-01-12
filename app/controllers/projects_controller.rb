# frozen_string_literal: true

# projects controller
class ProjectsController < ApplicationController
  def list
    query = Project.select("projects.id AS p_id, users.id AS u_id, projects.title AS title,
            projects.content AS content, users.user_name AS manager, projects
            .budget AS budget").joins('INNER JOIN users ON users.id = projects.manager_id').to_sql
    record = ActiveRecord::Base.connection.execute(query)
    if record
      render json: { data: record, status: :found }
    else
      render json: { status: :not_found }
    end
  end

  def show
    begin
      project = Project.find_by(id: params['id'])

      raise CustomException, "Project not found" if project.nil?
      render json: { status: :found, data: project }
    rescue => exception
      render json: { status: :not_found, message: exception.message }
    end
  end

  def create
    begin
      project = Project.create(permitted_params)
      raise CustomException, "Project not created" if project.id.nil?
      render json: { status: :created, data: project }
    rescue => exception
      render json: { status: :unprocessable_entity, message: exception.message }
    end
  end

  def update # rubocop:disable Metrics/AbcSize
    begin
      project = Project.find(params[:id])
      if project.update!(permitted_params)
        render json: { data: project, status: :ok }
      else
        raise CustomException, "Project couldn't be updated."
      end
    rescue => exception
      render json: { data: {}, status: :unprocessable_entity, message: exception.message }
    end

    # if project
    #   render json: { data: project, status: :ok }
    # else
    #   render json: { data: {}, status: :unprocessable_entity }
    # end
  end

  def assign_project_to_user # rubocop:disable Metrics/AbcSize
    user = User.find_by(id: params[:id])
    if user.role == 'user' && user.projects.any?
      render json: { data: user, status: :im_used,
                     message: "#{user.user_name} cannot work on multiple projects." }
    else
      project_user = ProjectsUser.create(
        project_id: params['project']['id'],
        user_id: params['id']
      )
      if project_user
        render json: { data: project_user, status: :created,
                       message: "Project successfully assigned to User: #{user.user_name}" }
      else
        render json: { data: {}, status: :unprocessable_entity,
                       message: 'Something went wrong while assigning project to user.' }
      end
    end
  end

  def destroy
    project = Project.find_by(id: params['id'])
    project.destroy
  end

  private

  def permitted_params
    params.require(:project).permit(:title, :content, :budget, :manager_id)
  end
end
