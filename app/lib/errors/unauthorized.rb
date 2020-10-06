module Errors
  class Unauthorized < Errors::StandardError
    def initialize(title: nil, detail: nil)
      super(
        status: 401,
        title: title || 'Unauthorized',
        detail: detail || 'You need to login to authorize this request.',
      )
    end
  end
end