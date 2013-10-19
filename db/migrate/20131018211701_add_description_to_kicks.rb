class AddDescriptionToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :description, :string
  end
end
