class Kick < ActiveRecord::Base
  belongs_to :user
  has_many :tags
  has_many :rsvps
  has_many :avatars

  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" , :large => "600x600" }, :default_url => "/assets/default.jpg"
  has_attached_file :user_avatar, :styles => { :medium => "300x300>", :thumb => "100x100>"}, :default_url => "/assets/default.jpg"

  validates_presence_of :title,  :location, :description, :time

  #remove time
  #Maybe "NOW or choose time?"
  #Maybe - rate how mmuch is gonna be consumed at the kick (slider) ?

  validates_length_of :description, :minimum => 10, :message => "must be more than 10 characters"


  default_scope -> { order('created_at DESC') }

end
