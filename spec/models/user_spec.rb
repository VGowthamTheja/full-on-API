require 'rails_helper'

RSpec.describe User, type: :model do
  context "when creating a user" do
    let(:user) { build :user }
    let(:user1) { create :user, email: "USERMAIL@GMAIL.COM" }
    let(:user3) { build :user, email: "invalid_email" }

    it 'should be valid user with all attributes' do
      expect(user.valid?).to eq(true)
    end

    it 'should have email address downcased before save' do
      expect(user1.email).to eq("USERMAIL@GMAIL.COM".downcase)
    end

    it 'should set the user role to default role of "user" after initializing' do
      user2 = FactoryBot.create(:user)
      expect(user2.role).to eq('user')
    end

    it 'should raise invalid record error when saved the already built user with invalid email' do
      expect { user3.save! }.to raise_error(ActiveRecord::RecordInvalid)
    end

  end

end
