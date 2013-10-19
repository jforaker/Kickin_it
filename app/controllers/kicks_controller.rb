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
    if @kick.save
      redirect_to root_path  #shows that kick
    else
      render :index     #change this
    end
  end

  private

  def kick_params
    params.require('kick').permit(:title, :description, :time, :location)
  end
end
