module Errors
  class InvalidRequest < Errors::StandardError
    def initialize(error: )
      super(
        title: 'Unprocessable Entity',
        status: 422,
        detail: error || 'Request is invalid'
      )
    end
  end
end