class AnnictApiWorks
  def initialize
    @base_url = "https://api.annict.com/v1/works"
    @access_token = ENV["ANNICT_ACCESS_TOKEN"]
  end

  def fetch_works(start_y)
    start_year = start_y
    end_year = Date.today.year + 1
    seasons = [ "winter", "spring", "summer", "autumn"]

    (start_year..end_year).each do |year|
      seasons.each do |season|
        response = Faraday.get("#{@base_url}", {
          fields: "id,title,title_kana,season_name_text,official_site_url,twitter_username,images",
          filter_season: "#{year}-#{season}",
          sort_watchers_count: 'desc',
          per_page: 50,
          access_token: @access_token
        })
        data = JSON.parse(response.body)
        next unless data["works"].is_a?(Array)
        
        create_work_records(data["works"])
      end
    end
  end

  private

  def create_work_records(works)
    formatted_works = works.map do |work|
      works.each do |work|

      work_record = Work.find_or_initialize_by(annict_id: work["id"])
      work_record.update(
        title: work["title"],
        title_kana: work["title_kana"],
        year: extract_year(work["season_name_text"]),
        season: extract_season(work["season_name_text"]),
        image_url: work.dig("images", "recommended_url").presence || work.dig("twitter", "mini_avatar_url").presence || work.dig("twitter", "normal_avatar_url").presence || work.dig("twitter", "original_avatar_url").presence || work.dig("images", "facebook", "og_image_url").presence || "" ,
        twitter_url: work["twitter_username"].present? ? "https://twitter.com/#{work['twitter_username']}" : nil,
        official_site_url: work["official_site_url"],
        annict_id: work["id"]
      )
      end
    end
  end

  def extract_year(season_name_text)
    return nil if season_name_text.nil?
    match_data = season_name_text.match(/(\d{4})/)
    if match_data
      match_data[1].to_i
    else
      nil
    end
  end

  def extract_season(season_text)
    return nil if season_text.nil?
    case season_text
      when /春/
        'spring'
      when /夏/
        'summer'
      when /秋/
        'autumn'
      when /冬/
        'winter'
      else
        nil
      end
  end

  def current_year_and_season
    current_time = Time.now
    year = current_time.year
    month = current_time.month

    season = case month
              when 1..3
                'winter'
              when 4..6
                'spring'
              when 7..9
                'summer'
              when 10..12
                'autumn'
              else
                nil
              end
    [year, season]
  end

end