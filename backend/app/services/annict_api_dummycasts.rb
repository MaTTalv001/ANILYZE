class AnnictApiDummycasts
  def initialize
    @base_url = "https://api.annict.com/v1/casts"
    @access_token = ENV["ANNICT_ACCESS_TOKEN"]
  end

  def fetch_dummycast(works)
    # ユニークなwork_idを保持する配列
    unique_work_ids = works.map { |work| work.annict_id }
    unique_work_ids.each do |work_annict_id|
      response = Faraday.get("#{@base_url}", {
        fields: 'id,sort_number,work.id,character.name,character.name_kana,person.id',
        per_page: 50,
        filter_work_id: work_annict_id,
        access_token: @access_token
      })
      data = JSON.parse(response.body)
      next unless data["casts"].is_a?(Array)
      create_dummycast_records(data["casts"], work_annict_id)
    end
  end
  
  private

  # API結果をCastテーブルへ登録する関数
  def create_dummycast_records(casts, work_annict_id)
    casts.each do |cast|
      work = Work.find_by(annict_id: work_annict_id)
      cast_record = DummyCast.find_or_initialize_by(annict_id: work_annict_id, person_id:cast["person"]["id"])
      # レコードの属性を更新
      unless cast_record.update(
        annict_id: work["annict_id"],
        person_id: cast["person"]["id"]
      )
      end
    end
  
  end
end