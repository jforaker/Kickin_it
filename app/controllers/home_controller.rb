class HomeController < ApplicationController
  before_filter :authenticate_user!

  def index
    @kicks = Kick.all.order('updated_at DESC')
    @user = current_user.id

  end

  def mykicks
    @kicks = Kick.all.find_by_user_id(current_user.id)

    #how to show just my kicks?
    #TODO - shows only one kick -- with user_id = 4
  end
end
