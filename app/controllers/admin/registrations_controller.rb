# frozen_string_literal: true

module Admin
  # Registrations controller
  class RegistrationsController < ApplicationController
    def create
      user = User.new(permitted_params)
      user.password = 'i04x%1REo'
      user.password_confirmation = 'i04x%1REo'
      if user.save
        render json: { status: :created, user: user }
      else
        render json: { status: :unprocessable_entity, message: 'user could not be created' }
      end
    rescue StandardError => e
      render json: { status: :unprocessable_entity, message: e.message }
    end

    def update
      user = User.find(params[:id])
      if user&.update(update_permitted_params)
        render json: { data: {}, status: :ok }
      else
        render json: { data: {}, status: :unprocessable_entity }
      end
    rescue ActiveRecord::RecordNotFound => e
      render json: { data: {}, status: :unprocessable_entity, message: e.message }
    end

    def reset_password
      user = User
             .find(params[:id])
             .try(:authenticate, params['user']['current_password'])

      raise CustomException, 'User not authenticated' unless user

      if user&.update(reset_password_params.except(:current_password))
        render json: { status: :ok, message: 'Password updated successfully' }
      end
    rescue StandardError => e
      render json: { status: :not_found, message: e.message }
    end

    private

    def permitted_params
      params.require(:user).permit(:email, :role, :manager_id, :user_name)
    end

    def update_permitted_params
      params.require(:user).permit(:user_name, :address, :dob)
    end

    def reset_password_params
      params.require(:user).permit(:password, :password_confirmation, :current_password)
    end
  end
end
