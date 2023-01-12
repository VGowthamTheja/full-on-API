# frozen_string_literal: true

# sessions controller
class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    user = User
           .find_by(email: params['user']['email'])
           .try(:authenticate, params['user']['password'])

    if user
      session[:user_id] = user.id
      render json: { user: user, status: :created, logged_in: true }
    else
      render json: { status: 401, logged_in: false }
    end
  end

  def logged_in
    if @current_user
      render json: { user: @current_user, logged_in: true }
    else
      render json: { logged_in: false }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end

  def is_admin # rubocop:disable Naming/PredicateName
    role = @current_user.role == 'admin'
    if role
      render json: { status: :ok }
    else
      render json: { status: :forbidden }
    end
  end
end
