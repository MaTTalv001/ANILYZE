class Api::V1::WorksController < ApplicationController
  def index
    @q = Work.ransack(params[:q])
    works = @q.result
              .includes(:people, :casts)
              .order(Arel.sql("year DESC, CASE season WHEN 'winter' THEN 4 WHEN 'spring' THEN 3 WHEN 'summer' THEN 2 WHEN 'autumn' THEN 1 END"))
              .page(params[:page])
              .per(params[:per] || 25)
              
    render json: {
      works: works.as_json(include: [:people, :casts]),
      total_pages: works.total_pages,
      current_page: works.current_page,
      total_count: works.total_count
    }
  end

  def show
    work = Work.includes(:casts, people: :casts).find(params[:id])
    render json: work.as_json(include: [:casts, people: { include: :casts }])
  end
end

