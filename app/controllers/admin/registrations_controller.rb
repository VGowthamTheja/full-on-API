# frozen_string_literal: true

module Admin
  
  # Registrations controller
  class RegistrationsController < ApplicationController
    def create # rubocop:disable Metrics/AbcSize
      
      begin
        user = User.new(permitted_params)
        user.password = 'i04x%1REo'
        user.password_confirmation = 'i04x%1REo'
        if user.save
          render json: { status: :created, user: user }
        else
          render json: { status: :unprocessable_entity, message: "user could not be created" }
        end
      rescue => exception
        render json: { status: :unprocessable_entity, message: exception.message}
      end
    end

    def update # rubocop:disable Metrics/AbcSize
      begin
        user = User.find(params[:id])
        if user&.update(update_permitted_params)
          render json: { data: {}, status: :ok }
        else
          render json: { data: {}, status: :unprocessable_entity }
        end
      rescue ActiveRecord::RecordNotFound => exception
        render json: { data: {}, status: :unprocessable_entity, message: exception.message }
      end
    end

    def reset_password # rubocop:disable Metrics/AbcSize
      begin
        user = User
              .find(params[:id])
              .try(:authenticate, params['user']['current_password'])

        raise CustomException, "User not authenticated" if !user

        if user&.update(reset_password_params.except(:current_password))
          render json: { status: :ok, message: 'Password updated successfully' }
        end
      rescue => exception
        render json: { status: :not_found, message: exception.message }
      end
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
