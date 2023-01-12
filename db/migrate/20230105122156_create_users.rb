# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.references :manager, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
