class AddAttachmentAvatarToKicks < ActiveRecord::Migration
  def self.up
    change_table :kicks do |t|
      t.attachment :avatar
    end
  end

  def self.down
    drop_attached_file :kicks, :avatar
  end
end
