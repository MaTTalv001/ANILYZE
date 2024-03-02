class Person < ApplicationRecord
  self.primary_key = 'person_id'
  has_many :casts, foreign_key: 'person_id'
  has_many :works, through: :casts

  def self.ransackable_attributes(auth_object = nil)
    %w[name]
  end

  def works_by_year
    works.group(:year).order('year ASC').count
  end

  # person_id の共演回数順を取得するメソッド
  def self.related_casts_info(person_id)
    annict_ids = Cast.where(person_id: person_id).pluck(:annict_id)
    related_casts = Cast.where(annict_id: annict_ids).where.not(person_id: person_id)

    result = related_casts.includes(:work).each_with_object(Hash.new { |h, k| h[k] = { count: 0, works: [] } }) do |cast, acc|
      acc[cast.person_id][:count] += 1
      acc[cast.person_id][:works] << cast.work.title unless acc[cast.person_id][:works].include?(cast.work.title)
    end

  # 降順にソートし、上位10件を保持する
    sorted_result = result.sort_by { |_person_id, value| -value[:count] }.first(10)
  
  # Personの名前を取得
    person_names = Person.where(person_id: sorted_result.map { |entry| entry.first }).pluck(:person_id, :name).to_h
    sorted_result_with_index = sorted_result.map.with_index(1) do |(person_id, info), index|
      { 
        rank: index, 
        person_id: person_id, 
        name: person_names[person_id],  # 名前を追加
        count: info[:count], 
        works: info[:works] 
      }
    end
  sorted_result_with_index
end

end
