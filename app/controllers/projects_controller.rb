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
    project = Project.find_by(id: params['id'])

    if project
      render json: { data: project, status: :found }
    else
      render json: { data: {}, status: :not_found }
    end
  end

  def create
    project = Project.create(title: params['project']['title'], content: params['project']['content'],
                             budget: params['project']['budget'],
                             manager_id: params['project']['manager'])

    if project
      render json: { data: project, status: :created }
    else
      render json: { status: :unprocessable_entity }
    end
  end

  def update # rubocop:disable Metrics/AbcSize
    project = Project.find_by(id: params['id'])

    project.update(title: params['project']['title'], content: params['project']['content'],
                   budget: params['project']['budget'],
                   manager_id: params['project']['manager'])
    if project
      render json: { data: project, status: :ok }
    else
      render json: { data: {}, status: :unprocessable_entity }
    end
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
end
