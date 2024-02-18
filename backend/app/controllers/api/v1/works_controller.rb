class Api::V1::WorksController < ApplicationController
  def index
     @q = Work.ransack(params[:q])
    works = @q.result.includes(:people, :casts).page(params[:page]).per(params[:per] || 25)
    render json: {
      works: works.as_json(include: [:people, :casts]),
      total_pages: works.total_pages,
      current_page: works.current_page,
      total_count: works.total_count
    }
  end
end
