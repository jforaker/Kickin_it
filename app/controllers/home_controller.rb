class HomeController < ApplicationController
  before_filter :authenticate_user!

  def index
    @kicks = Kick.all.order('updated_at DESC')
    @user = current_user.id

    respond_to do |format|
      format.html
      format.json { render json: @kicks }
    end

  end

end
