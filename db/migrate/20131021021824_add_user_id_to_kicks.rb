class AddUserIdToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :user_id, :integer
  end
end
