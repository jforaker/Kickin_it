class AddUserIdToProfiles < ActiveRecord::Migration
  def change
    add_column :profiles, :user_id, :string
  end
end
