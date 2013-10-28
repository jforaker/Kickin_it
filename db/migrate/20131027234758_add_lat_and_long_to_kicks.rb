class AddLatAndLongToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :longitude, :float
    add_column :kicks, :latitude, :float
  end
end
