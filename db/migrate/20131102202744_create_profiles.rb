class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.string :drunkness
      t.string :smartness
      t.string :loudness

      t.timestamps
    end
  end
end
