class Work < ApplicationRecord
  has_many :casts, foreign_key: :annict_id
  has_many :people, through: :casts
end
