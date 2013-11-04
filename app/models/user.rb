class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable


  before_save :create_permalink , :save_characteristics

  validates_uniqueness_of :name


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :kicks
  has_many :profiles
  acts_as_tagger

  def user_id
    current_user.id
  end

  def to_param
    permalink
    drunkness
  end

  private
  def create_permalink
    self.permalink = name
  end

  def save_characteristics
    self.drunkness = drunkness
  end
end
