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

    kick_params = params.require(:kick).permit(:title, :description, :time, :location)
    @kick = Kick.new(kick_params)
    params[:user_id] = current_user.id             #add user id to the current kick
    if @kick.save
      redirect_to @kick  #shows that kick
    else
      render :index     #change this
    end
  end

  private

  def kick_params
    params.require('kick').permit(:title, :description, :time, :location)
  end
end
