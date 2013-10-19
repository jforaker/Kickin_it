class AddLocationToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :location, :string
  end
end
