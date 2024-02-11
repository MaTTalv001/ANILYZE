class CreateWorks < ActiveRecord::Migration[7.0]
  def change
    create_table :works do |t|
      t.string :title, null: false
      t.string :title_kana
      t.integer :year
      t.string :season
      t.string :image_url
      t.string :official_site_url
      t.string :twitter_url
      t.integer :annict_id, null: false

      t.timestamps
    end
  end
end
