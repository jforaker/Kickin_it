class AddUserAvatarToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :user_avatar, :string
  end
end
