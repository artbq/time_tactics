namespace :graphql do
  task :update_schema => :environment do
    schema = GraphSchema.execute(GraphQL::Introspection::INTROSPECTION_QUERY)
    File.write("graphql_schema.json", schema.to_json)
  end
end
