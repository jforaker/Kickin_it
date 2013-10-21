class AddGmapFieldToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :gmaps, :boolean
  end
end
