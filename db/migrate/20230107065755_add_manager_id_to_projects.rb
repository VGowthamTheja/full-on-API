# frozen_string_literal: true

class AddManagerIdToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :manager_id, :integer
  end
end
