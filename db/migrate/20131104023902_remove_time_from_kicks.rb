class RemoveTimeFromKicks < ActiveRecord::Migration
  def change
    remove_column :kicks, :time, :integer
  end
end
