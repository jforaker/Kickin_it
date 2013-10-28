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

  def mykicks
    @kicks = Kick.all

    respond_to do |format|
      format.html
      format.json { render json: @kicks }
    end

    #@kicks = Kick.all.order('updated_at DESC').find_by_user_id(5)

    #how to show just my kicks?
    #TODO - shows only one kick -- with user_id = 4
  end
end
