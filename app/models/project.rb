class Project < ApplicationRecord
    # Validations
    validates_presence_of :title
    validates_uniqueness_of :title
    validates_presence_of :content
    validates_presence_of :budget

    # Project to User associations
    belongs_to :manager, class_name: 'User', foreign_key: :manager_id
    has_and_belongs_to_many :users
end
