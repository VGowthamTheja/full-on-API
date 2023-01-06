class AddAttrsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :email, unique: true
    add_column :users, :confirmed_at, :datetime
  end
end
