class CreatePlans < ActiveRecord::Migration[5.0]
  def change
    create_table :plans do |t|
      t.references :user, foreign_key: true, null: false
      t.string :name, null: false
      t.datetime :start, null: false
      t.datetime :finish, null: false

      t.timestamps
    end
  end
end
