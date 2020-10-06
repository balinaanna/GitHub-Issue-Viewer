module Errors
  class Unauthorized < Errors::StandardError
    def initialize(error: nil)
      super(
        title: 'Unauthorized',
        status: 401,
        detail: error || 'You need to login to authorize this request.',
      )
    end
  end
end