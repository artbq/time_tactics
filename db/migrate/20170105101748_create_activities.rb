class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.references :user, foreign_key: true, null: false
      t.string :name, null: false
      t.string :color, null: false

      t.timestamps
    end
  end
end
