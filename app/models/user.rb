class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable


  before_save :create_permalink


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :kicks
  has_many :characteristics

  def user_id
    current_user.id
  end

  def to_param
    permalink
  end

  private
  def create_permalink
    self.permalink = name
  end
end
