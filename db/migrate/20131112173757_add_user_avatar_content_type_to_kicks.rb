class AddUserAvatarContentTypeToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :user_avatar_content_type, :string
  end
end
