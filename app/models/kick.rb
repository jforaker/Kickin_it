class Kick < ActiveRecord::Base
  validates_presence_of :title, :description, :time, :location
  validates_length_of :description, :minimum => 10, :message => "must be more than 10 characters"
  #validates_numericality_of :time    #NO SEMICOLON???                 #, :greater_than => 0, :message => "time wrong"
  #validates :time, numericality: { only_integer: true }
  #validates_time :time, :between => '9:00am'...'5:00pm'




end
