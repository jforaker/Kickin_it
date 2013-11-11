class UserController < ApplicationController

  def edit
    #@user = User.find_by_id(current_user.id)
    @user = User.find_by_permalink(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @user }
    end
  end

  def show
    @user = User.find_by_permalink(params[:id])
  end

  ##TODO -- refactor from profile controller

  def update
    @user = User.find_by_id(current_user.id)
    user_params = params.require(:user).permit(:smartness, :loudness, :drunkness, :avatar, :filepicker_url)
    respond_to do |format|
      if @user.update_attributes(user_params)
        format.html { redirect_to user_path(@user.permalink), notice: 'Profile was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def user_params
    params.require('user').permit(:smartness, :loudness, :drunkness, :avatar, :filepicker_url)
  end

end
