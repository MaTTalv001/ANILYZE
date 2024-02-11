class CreatePeople < ActiveRecord::Migration[7.0]
  def change
    create_table :people do |t|
      t.string :name, null: false
      t.string :name_en
      t.string :official_site_url
      t.string :twitter_url
      t.date :birthday
      t.integer :person_id, null: false

      t.timestamps
    end
  end
end
