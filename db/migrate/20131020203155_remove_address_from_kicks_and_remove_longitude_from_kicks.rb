class RemoveAddressFromKicksAndRemoveLongitudeFromKicks < ActiveRecord::Migration
  def change
    remove_column :kicks, :address, :string
    remove_column :kicks, :longitude, :float
  end
end
