class CreateCasts < ActiveRecord::Migration[7.0]
  def change
    create_table :casts do |t|
      t.integer :annict_id, null: false
      t.integer :sort_number
      t.integer :cast_id, null: false
      t.string :character_name
      t.string :character_name_kana
      t.integer :person_id, null: false
      t.timestamps
    end
  end
end
