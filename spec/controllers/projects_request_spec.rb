require 'rails_helper'

RSpec.describe "Projects", type: :request do

    describe "#list" do
        let(:user) {User.first}
        let!(:project){ Project.create(title: 'Sample title', content: 'Sample content', budget: '12345', manager_id: user.id) }

        before(:each) do
            get projects_path
        end

        # TODO: make a get request
        it 'returns the expected result in response with a 200 http_status_code' do
            expect(response).to have_http_status(200)
        end

        it 'returns the expected result in response to a mocked response' do
            mock_response = [{"p_id"=>1, "u_id"=>1, "title"=>"Sample title", "content"=>"Sample content", "manager"=>"Sample name", "budget"=>"12345"}]
            expect(JSON.parse(response.body)['data']).to match_array(mock_response)
        end

        it 'returns the expected result in response with expected length' do
            expect(JSON.parse(response.body)['data'].length).to eq(1)
        end

    end
    
    describe "#create" do

        project_mock = {"id"=>1, "title"=>"A binary project", "content"=>"One mail binary actions project to make testing easy.", "budget"=>"2,000,000", "manager_id"=>1}
        # TODO: make a post request
        it "makes a post request to the projects database table and returns 200 status" do
            post '/projects', params:{ project: { "title"=>'A binary project', "content"=>'One mail binary actions project to make testing easy.', "budget"=>'2,000,000', "manager_id"=>1 } }, :headers=>{ "ACCEPT"=>"application/json" }

            expect(response.status).to eq 200
        end

        it "makes a post request to the projects database table and returns a response that matches mocked response" do
            post '/projects', params:{ project: { "title"=>'A binary project', "content"=>'One mail binary actions project to make testing easy.', "budget"=>'2,000,000', "manager_id"=>1 } }, :headers=>{ "ACCEPT"=>"application/json" }

            expect(JSON.parse(response.body)['data']).to include(project_mock)
        end
    end
    
end