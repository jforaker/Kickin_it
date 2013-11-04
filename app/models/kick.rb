class Kick < ActiveRecord::Base
  belongs_to :user
  has_many :tags
  acts_as_taggable_on :tags


  validates_presence_of :title,  :location, :description, :time

  #remove time
  #Maybe "NOW or choose time?"
  #Maybe - rate how mmuch is gonna be consumed at the kick (slider) ?

  validates_length_of :description, :minimum => 10, :message => "must be more than 10 characters"


  default_scope -> { order('created_at DESC') }

end
