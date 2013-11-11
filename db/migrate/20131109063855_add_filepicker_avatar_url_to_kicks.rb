class AddFilepickerAvatarUrlToKicks < ActiveRecord::Migration
  def up
    add_column :kicks, :filepicker_avatar_url, :string
  end

  def down
    remove_column :kicks, :filepicker_avatar_url
  end
end
