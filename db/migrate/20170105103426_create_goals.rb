class CreateGoals < ActiveRecord::Migration[5.0]
  def change
    create_table :goals do |t|
      t.references :user, foreign_key: true, null: false
      t.references :activity, foreign_key: true, null: false
      t.integer :duration, null: false
      t.date :date, null: false
      t.string :type, null: false

      t.timestamps
    end
  end
end
