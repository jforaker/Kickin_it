class UserController < ApplicationController


  def show
    @user = User.find_by_permalink(params[:id])
    @title = @user.name
  end

end
