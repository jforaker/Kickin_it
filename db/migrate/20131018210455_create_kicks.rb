class CreateKicks < ActiveRecord::Migration
  def change
    create_table :kicks do |t|

      t.timestamps
    end
  end
end
