class AddKickIdAndPermalinkToRsvps < ActiveRecord::Migration
  def change
    add_column :rsvps, :kick_id, :integer
    add_column :rsvps, :permalink, :string
  end
end
