# frozen_string_literal: true

# application controller
class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  class CustomException < StandardError; end
end
