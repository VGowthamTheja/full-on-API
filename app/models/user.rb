class User < ApplicationRecord
    before_save :downcase_email
    has_secure_password
    
    validates_presence_of :email
    validates_uniqueness_of :email
    validates_presence_of :password

    private

    def downcase_email
        self.email = email.downcase
    end
end
