require 'rails_helper'

RSpec.describe Admin::RegistrationsController, type: :controller do
    describe 'GET user' do
        let(:user) {User.create(user_name: 'Sample name', email:'testmail@gmail.com', password:"password", password_confirmation:"password", manager_id: 1, role: 'admin')}

        before(:each) do
            session['user_id'] = user.id
            get :index
        end

        it 'assigns users and returns 200 status' do
            expect(response).to have_http_status(200)
        end
        
        it 'returns response to match the mock array' do
            user = { "user_name"=>'Sample name', "email"=>'testmail@gmail.com', "role"=>'user', "id"=>1 }
            
            expect(JSON.parse(response.body)).to match_array([user])
        end
    end

    describe '#create' do
        # TODO make a post request to create
        let(:user) {User.create(user_name: 'Sample name', email:'test2mail@gmail.com', password:"password", password_confirmation:"password", manager_id: 1, role: 'admin')}
        
        before(:each) do
            session['user_id'] = user.id
        end

        it 'should accept the params with JSON format' do
            post :create, params: {
               "user"=>user_params
            }
            expect(response).to have_http_status(200)
        end

        it 'should accept the JSON format with response type of "application/json"' do
            post :create, params: {
                "user"=>user_params
             }
             expect(response.content_type).to eq('application/json; charset=utf-8')
             expect(response.media_type).to eq('application/json')
        end

        it 'should raise a validation error when empty hash is submitted' do
            post :create, params: {
                "user"=>{
                    email: nil,
                    password: nil,
                    manager_id: nil,
                    user_name: nil,
                    address: Faker::Address.full_address,
                    dob: Faker::Date.birthday(min_age: 18, max_age: 45)
                }
             }
             expect(response.body).to include('user could not be created')
        end

        def user_params
            {
                email: Faker::Internet.email,
                password: Faker::Internet.password(min_length: 8),
                manager_id: 1,
                user_name: 'Sample name',
                address: Faker::Address.full_address,
                dob: Faker::Date.birthday(min_age: 18, max_age: 45)
            }
        end
        
    end

    #! Delete action of a user.
    describe '#destroy' do
        let!(:user_d) { User.create(user_name: 'Sample delete', email:'delmail@gmail.com', password:"password", password_confirmation:"password", manager_id: 1) }

        before(:each) do
            session['user_id'] = 1
        end

        it 'should destroy the user' do
            expect(User.all.size).to eq(2)
            delete :delete, params: {
                id: user_d.id
            }
            expect(User.all.size).to eq(1)
        end
    end
end
