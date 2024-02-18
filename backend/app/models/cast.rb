class Cast < ApplicationRecord
  belongs_to :work, primary_key: 'annict_id', foreign_key: 'annict_id'
  belongs_to :person, primary_key: 'person_id', foreign_key: 'person_id'

  def self.ransackable_attributes(auth_object = nil)
    %w[character_name]
  end
end
