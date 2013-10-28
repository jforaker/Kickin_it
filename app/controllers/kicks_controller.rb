class KicksController < ApplicationController
  def index

  end

  def show
    @kick = Kick.find(params[:id])
  end

  def new
    @kick = Kick.new
  end

  def create

    kick_params = params.require(:kick).permit(:title, :description, :time, :location, :user_id, :latitude, :longitude)
    #params[:user_id] = current_user.id           #add user id to the current kick
    @kick = Kick.new(kick_params)
    @kick.user_id = current_user.id
    if @kick.save
      redirect_to @kick  #shows that kick
    else
      render :index     #change this
    end
  end

  private

  def kick_params
    params.require('kick').permit(:title, :description, :time, :location, :user_id, :latitude, :longitude)
  end
end
