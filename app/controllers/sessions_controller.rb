class SessionsController < Knock::AuthTokenController
  skip_before_action :authenticate

  def create
    begin
      authenticate      
    rescue OAuth2::Error => e
      raise Errors::Unauthorized.new error: e.description
    end

    render json: { data: { token: auth_token.token } }
  rescue Errors::InvalidRequest => e
    render json: ErrorSerializer.new(e), status: e.status
  rescue Errors::Unauthorized => e
    render json: ErrorSerializer.new(e), status: 401
  end

  private
  # Knock overrides
  # TODO: Move into Operation
  def entity_name
    'User'
  end

  def auth_params
    params.require(:code)
    params.require(:session).permit :code
  rescue ActionController::ParameterMissing => e
    raise Errors::InvalidRequest.new error: "Request is invalid -  #{e.message}"
  end

  def user
    entity
  end

  def authenticate
    unless entity.present? && entity.authenticate(auth_params[:code])
      raise Knock.not_found_exception_class
    end
  end
end
