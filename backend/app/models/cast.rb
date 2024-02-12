class Cast < ApplicationRecord
  belongs_to :work, primary_key: 'annict_id', foreign_key: 'annict_id'
  belongs_to :person, primary_key: 'person_id', foreign_key: 'person_id'
end
