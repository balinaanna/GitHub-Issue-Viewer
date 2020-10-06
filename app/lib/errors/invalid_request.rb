module Errors
  class InvalidRequest < Errors::StandardError
    def initialize(detail: nil)
      super(
        status: 422,
        title: 'Unprocessable Entity',
        detail: detail || 'Request is invalid'
      )
    end
  end
end