class AddUsernameToKicks < ActiveRecord::Migration
  def change
    add_column :kicks, :username, :string
  end
end
