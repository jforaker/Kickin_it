class HomeController < ApplicationController
  before_filter :authenticate_user!

  def index
    #@kicks = Kick.all.order("created_at DESC")
    @kicks = Kick.where("created_at >= ?", 1.day.ago.utc).order("created_at DESC")
    #@user = current_user.id
    @user = User.find_by_permalink(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @kicks }
    end

  end

end
