class Api::V1::DataController < ApplicationController

    def test
        render json: { status: "It's working on api rails" }
    end
end