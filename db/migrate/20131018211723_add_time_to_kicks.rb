class AddTimeToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :time, :integer
  end
end
