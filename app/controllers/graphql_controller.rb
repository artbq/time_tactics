class GraphqlController < ApplicationController
  def graphql
    render json: GraphSchema.execute(query, variables: variables)
  end

  private

  def query
    params.fetch(:query)
  end

  def variables
    params.fetch(:variables, {})
  end
end
