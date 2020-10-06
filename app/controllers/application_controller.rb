class ApplicationController < ActionController::API
  include Knock::Authenticable

  rescue_from Errors::StandardError, with: :show_generic_error

  protected
  def unauthorized_entity(entity_name)
    e = Errors::Unauthorized.new
    render json: ErrorSerializer.new(e), status: e.status
  end

  def show_generic_error(error)
    render json: ErrorSerializer.new(error), status: error.status
  end

  def show_github_service_error(error, detail = nil)
    unless error.is_a?(Github::Error::ServiceError)
      e = Errors::StandardError.new
    else
      title  = JSON.parse(error.response_message)['message']
      status = error.http_status_code == 401 ? 403 : error.http_status_code

      e = Errors::StandardError.new title: title, detail: detail, status: status
    end

    render json: ErrorSerializer.new(e), status: e.status
  end
end
