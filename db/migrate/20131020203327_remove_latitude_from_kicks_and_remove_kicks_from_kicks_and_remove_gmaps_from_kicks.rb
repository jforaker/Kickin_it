class RemoveLatitudeFromKicksAndRemoveKicksFromKicksAndRemoveGmapsFromKicks < ActiveRecord::Migration
  def change
    remove_column :kicks, :gmaps, :boolean
    remove_column :kicks, :kicks, :float
  end
end
