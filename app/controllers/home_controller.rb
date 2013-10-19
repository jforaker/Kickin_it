class HomeController < ApplicationController
  def index
    @kicks = Kick.all
  end
end
