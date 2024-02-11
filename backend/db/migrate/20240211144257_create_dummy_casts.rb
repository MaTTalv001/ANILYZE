class CreateDummyCasts < ActiveRecord::Migration[7.0]
  def change
    create_table :dummy_casts do |t|
      t.integer :annict_id, null: false
      t.integer :person_id, null: false

      t.timestamps
    end
  end
end
