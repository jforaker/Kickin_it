class AddPermalinkToProfile < ActiveRecord::Migration
  def change
    add_column :profiles, :permalink, :string
  end
end
