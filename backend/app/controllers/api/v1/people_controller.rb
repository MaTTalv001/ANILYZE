# app/controllers/api/v1/people_controller.rb
module Api
  module V1
    class PeopleController < ApplicationController
      def index
        people = Person.all
        render json: people
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
