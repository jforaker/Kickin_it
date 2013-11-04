class AddDetailsToUser < ActiveRecord::Migration
  def change
    add_column :users, :loudness, :string
    add_column :users, :drunkness, :string
    add_column :users, :smartness, :string
  end
end
