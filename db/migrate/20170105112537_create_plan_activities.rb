class CreatePlanActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :plan_activities do |t|
      t.references :plan, foreign_key: true, null: false
      t.references :activity, foreign_key: true, null: false

      t.timestamps
    end
  end
end
