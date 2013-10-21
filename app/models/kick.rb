class Kick < ActiveRecord::Base
  belongs_to :users

  validates_presence_of :title,  :location, :description, :time  # :user_id


  validates_length_of :description, :minimum => 10, :message => "must be more than 10 characters"
  #validates_numericality_of :time    #NO SEMICOLON???                 #, :greater_than => 0, :message => "time wrong"
  #validates :time, numericality: { only_integer: true }
  #validates_time :time, :between => '9:00am'...'5:00pm'

  default_scope -> { order('created_at DESC') }

end
