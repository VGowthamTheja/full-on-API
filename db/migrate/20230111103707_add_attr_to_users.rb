class AddAttrToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :dob, :datetime
    add_column :users, :address, :string
  end
end
