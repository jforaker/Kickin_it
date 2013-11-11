class AddPixForFilepickerUrlToKicks < ActiveRecord::Migration
  def up
    add_column :kicks, :filepicker_url, :string
  end

  def down
    remove_column :kicks, :filepicker_url
  end
end
