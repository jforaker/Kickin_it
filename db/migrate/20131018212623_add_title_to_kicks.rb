class AddTitleToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :title, :string
  end
end
