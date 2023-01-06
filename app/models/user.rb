class User < ApplicationRecord
    before_save :downcase_email
    has_secure_password
    
    validates_presence_of :email
    validates_uniqueness_of :email
    validates_presence_of :password

    enum role: { user: 'user', manager: 'manager', TL: 'TL', admin: 'admin' }

    after_initialize :set_default_role, if: :new_record?

    def set_default_role
      self.role ||= :user
    end

    private

    def downcase_email
        self.email = email.downcase
    end
end
