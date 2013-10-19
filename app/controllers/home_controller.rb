class HomeController < ApplicationController
  before_filter :authenticate_user!

  def index
    @kicks = Kick.all
  end
end
