class Api::V1::WorksController < ApplicationController
  def index
    @works = Work.includes(:people).page(params[:page] || 1).per(params[:per] || 25)
    render json: {
      works: @works.as_json(include: :people),
      total_pages: @works.total_pages,
      current_page: @works.current_page,
      total_count: @works.total_count
    }
  end
end
