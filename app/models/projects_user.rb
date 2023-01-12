# frozen_string_literal: true

# projects_users model
class ProjectsUser < ApplicationRecord
  belongs_to :project
  belongs_to :user
end
