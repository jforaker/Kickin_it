class ProfileController < ApplicationController
  def show
    @user = User.find_by_permalink(params[:id])                       ##TODO
    permalink = @user.permalink
    @profile = Profile.find_by_permalink(permalink)
    respond_to do |format|
      format.html
      format.json { render json: @profile }
    end
  end

  def edit
    #@user = User.find_by_id(current_user.id)
    @user = User.find_by_permalink(params[:id])                       ##TODO
    permalink = @user.permalink
    @profile = Profile.find_by_permalink(permalink)
    respond_to do |format|
      format.html
      format.json { render json: @profile }
    end
  end

  def new
    @profile = Profile.new

  end

  def update
    @data = params[:data]
    @profile = Profile.new(params[:data])     ##TODO -- creates ONE new profile - cant edit
    @profile.permalink = current_user.permalink
    @profile.loudness =  params[:three]
    @profile.drunkness =  params[:two]
    @profile.smartness =  params[:one]

    #respond_to do |format|
    #  if @profile.update_attributes(params[:data])
    #    format.html { redirect_to profile_path(@profile.user_id), notice: 'Post was successfully updated.' }
    #    format.json { head :no_content }
    #  else
    #    format.html { render action: "edit" }
    #    format.json { render json: @profile.errors, status: :unprocessable_entity }
    #  end
    #end


    if @profile.save
      #render :status => 200
      redirect_to profile_path(@profile.permalink)  ##TODO  -- does not redirect to profile/Steve
    else
      # exception handling
    end

  end
end
