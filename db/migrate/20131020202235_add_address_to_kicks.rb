class AddAddressToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :kicks, :string
  end
end
