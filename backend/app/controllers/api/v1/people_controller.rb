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
    end
  end
end
