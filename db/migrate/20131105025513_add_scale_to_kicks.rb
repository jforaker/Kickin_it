class AddScaleToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :scale, :string
  end
end
