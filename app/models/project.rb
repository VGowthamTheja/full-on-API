# frozen_string_literal: true

# project model
class Project < ApplicationRecord
  # Validations
  validates :title, presence: true
  validates :title, uniqueness: true
  validates :content, presence: true
  validates :budget, presence: true

  # Project to User associations
  belongs_to :manager, class_name: 'User'
  has_and_belongs_to_many :users
end
