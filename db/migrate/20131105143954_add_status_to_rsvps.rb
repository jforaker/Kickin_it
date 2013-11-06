class AddStatusToRsvps < ActiveRecord::Migration
  def change
    add_column :rsvps, :status, :string
  end
end
