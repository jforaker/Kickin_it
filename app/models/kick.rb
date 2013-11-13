class Kick < ActiveRecord::Base


  belongs_to :user
  has_many :avatars

  attr_accessor  :user_avatar_file_name

  #for paperclip files saving to Amazon s3
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" , :large => "600x600" },
                    :default_url => "/assets/default.jpg"    ,
                    :storage => :s3, :s3_credentials => "#{::Rails.root}/config/s3.yml"


  #for paperclip files saving to Amazon s3
  has_attached_file :user_avatar, :styles => { :medium => "300x300>", :thumb => "100x100>"},
                    :default_url => "https://s3.amazonaws.com/kickin_it_s3/icons/default.jpg" ,
                    :storage => :s3, :s3_credentials => "#{::Rails.root}/config/s3.yml"


  validates_presence_of :title,  :location, :description, :time
  validates_length_of :description, :minimum => 10, :message => "must be more than 10 characters"
  default_scope -> { order('created_at DESC') }

end
