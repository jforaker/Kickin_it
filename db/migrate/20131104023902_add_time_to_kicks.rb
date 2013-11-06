class RemoveTimeFromKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :time, :string
  end
end
