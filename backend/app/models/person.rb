class Person < ApplicationRecord
  self.primary_key = 'person_id'
  has_many :casts, foreign_key: 'person_id'
  has_many :works, through: :casts

  def self.ransackable_attributes(auth_object = nil)
    %w[name]
  end
end
