class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  before_save :create_permalink , :save_characteristics

  validates_uniqueness_of :name


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :kicks
  has_many :rsvps

  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"

  def user_id
    current_user.id
  end

  def to_param
    permalink
    drunkness
    smartness
    loudness
  end

  private
  def create_permalink
    self.permalink = name
  end

  def save_characteristics
    self.drunkness
    self.smartness
    self.loudness
  end
end
