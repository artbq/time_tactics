module Types
  CreatePlanPayloadType = GraphQL::ObjectType.define do
    name "CreatePlanPayload"

    field :newPlan, PlanType
    field :calendar, CalendarType
  end
end
