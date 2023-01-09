class User < ApplicationRecord
    before_save :downcase_email
    has_secure_password
    
    # Validations
    validates_presence_of :email
    validates_uniqueness_of :email
    validates_presence_of :password

    # Self joining for the heirarchy of users
    has_many :subordinates, class_name: 'User', foreign_key: "manager_id"
    belongs_to :manager, class_name: 'User', optional: true

    # Project integrations
    has_many :manager_projects, class_name: 'Project', foreign_key: :manager_id
    has_and_belongs_to_many :projects, class_name: 'Project'

    # user role definitions
    enum role: { user: 'user', manager: 'manager', TL: 'TL', admin: 'admin' }

    # Confining User scopes
    scope :managers, -> {select("id, user_name").where(role: 'manager')}
    scope :admins, -> {select("id, user_name").where(role: 'admin')}
    scope :team_leads, -> {select("id, user_name").where(role: 'TL')}
    scope :users, -> {select("id, user_name").where(role: 'user')}

    after_initialize :set_default_role, if: :new_record?

    def set_default_role
      self.role ||= :user
    end

    private

    def downcase_email
        self.email = email.downcase
    end
end
