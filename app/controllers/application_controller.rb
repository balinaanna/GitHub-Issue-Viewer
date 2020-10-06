class ApplicationController < ActionController::API
  include Knock::Authenticable

  protected
  def unauthorized_entity(entity_name)
    e = Errors::Unauthorized.new
    render json: ErrorSerializer.new(e), status: e.status
  end
end
