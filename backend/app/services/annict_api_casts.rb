class AnnictApiCasts
  def initialize
    @base_url = "https://api.annict.com/v1/casts"
    @access_token = ENV["ANNICT_ACCESS_TOKEN"]
  end

  def fetch_cast(works)
    unique_work_ids = works.map { |work| work.annict_id }
    unique_work_ids.each do |work_annict_id|
      response = Faraday.get("#{@base_url}", {
        fields: 'id,sort_number,work.id,character.id,character.name,character.name_kana,person.id',
        per_page: 25,
        filter_work_id: work_annict_id,
        access_token: @access_token
      })
      data = JSON.parse(response.body)
      next unless data["casts"].is_a?(Array)
      
      create_cast_records(data["casts"], work_annict_id)

      sleep(1)
    end
  end
  
  private

  # API結果をCastテーブルへ登録する関数
  def create_cast_records(casts, work_annict_id)
    casts.each do |cast|
      #Rails.logger.error "cast: #{cast}"
      work = Work.find_by(annict_id: work_annict_id)
      #Rails.logger.error "work.annict_id: #{work.annict_id}"
      person = Person.find_by(person_id: cast["person"]["id"])
      #Rails.logger.error "person.person_id: #{person.person_id}"
      cast_record = Cast.find_or_initialize_by(annict_id: work.annict_id, person_id:person.person_id)
      # レコードの属性を更新
      unless cast_record.update(
        annict_id: work.annict_id,
        person_id: person.person_id,
        cast_id: cast["character"]["id"],
        sort_number: cast["sort_number"],
        character_name: cast["character"]["name"],
        character_name_kana: cast["character"]["en"]
      )
      end
       #Rails.logger.error "Failed to update cast_record: #{cast_record.errors.full_messages.join(", ")}"
    end
  
  end
end