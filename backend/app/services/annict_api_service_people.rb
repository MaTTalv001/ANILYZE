class AnnictApiServicePeople
  def initialize
    @base_url = "https://api.annict.com/v1/people"
    @access_token = ENV["ANNICT_ACCESS_TOKEN"]
  end

  def fetch_people(dummycasts)
  
    unique_people_ids = dummycasts.map { |dummycast| dummycast.person_id }.uniq
    unique_people_ids.each do |person_id|
      response = Faraday.get("#{@base_url}", {
        fields: 'id,name,name_en,url,wikipedia_url,twitter_username,birthday',
        per_page: 50,
        filter_ids: person_id,
        access_token: @access_token
      })
      data = JSON.parse(response.body)
      create_person_records(data["people"], person_id)
    end
  end
  
  private

  # API結果をActorテーブルへ登録する関数
  def create_person_records(people, person_id)
    people.each do |person|
      # Actor モデルのレコードを検索し、存在しない場合は初期化
      person_record = Person.find_or_initialize_by(person_id: person["id"])
      # レコードの属性を更新
      unless person_record.update(
        person_id: person["id"],
        name: person["name"],
        name_en: person["name_en"],
        official_site_url: person["url"],
        twitter_url: person["twitter_username"].present? ? "https://twitter.com/#{person['twitter_username']}" : nil,
        birthday: person["birthday"]
      )
      end
    end
  
  end
end