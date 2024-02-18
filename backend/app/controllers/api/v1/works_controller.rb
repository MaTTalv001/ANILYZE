class Api::V1::WorksController < ApplicationController
  def index
    @works = Work.includes(:people).all
    render json: @works.as_json(include: :people)
  end
end
