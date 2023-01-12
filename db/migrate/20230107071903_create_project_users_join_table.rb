# frozen_string_literal: true

class CreateProjectUsersJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_table :projects_users, id: false do |t|
      t.references :project, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
    end
  end
end
