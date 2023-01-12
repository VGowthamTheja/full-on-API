# frozen_string_literal: true

class AddUsernameToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :user_name, :string
  end
end
