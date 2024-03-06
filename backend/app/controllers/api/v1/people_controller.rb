# app/controllers/api/v1/people_controller.rb
module Api
  module V1
    class PeopleController < ApplicationController
      def index
        # Ransackを使用した検索条件の適用
        search_query = Person.ransack(params[:q])
        @people = search_query
                  .result
                  .joins(:casts)
                  .select('people.*, COUNT(casts.annict_id) AS work_count')
                  .group('people.id')
                  .order('work_count DESC')
                  .page(params[:page] || 1)
                  .per(params[:per] || 25)

        render json: {
          people: @people.as_json(methods: :work_count),
          total_pages: @people.total_pages,
          current_page: @people.current_page,
          total_count: @people.total_count
        }
      end


      def show
        person = Person.includes(works: :casts).find(params[:id])
        render json: person, include: [works: { include: :casts }]
      end

      def works_by_year
        person = Person.find(params[:id])
        render json: person.works_by_year
      end

      def co_actors
        # Personモデルのクラスメソッドを呼び出して共演情報を取得
        co_actors_info = Person.related_casts_info(params[:id])
        render json: co_actors_info
      end
    end
  end
end
