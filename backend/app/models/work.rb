class Work < ApplicationRecord
  self.primary_key = 'annict_id'
  has_many :casts, foreign_key: 'annict_id'
  has_many :people, through: :casts
end
