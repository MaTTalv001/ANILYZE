class Work < ApplicationRecord
  self.primary_key = 'annict_id'
  has_many :casts, foreign_key: 'annict_id'
  has_many :people, through: :casts

  # Ransackで検索可能な属性を指定
  def self.ransackable_attributes(auth_object = nil)
    super + %w[title year]
  end

  # 任意: Ransackで検索可能な関連を指定（人物名やキャラクター名での検索を許可する場合）
  def self.ransackable_associations(auth_object = nil)
    %w[people casts]
  end
end
