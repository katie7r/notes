class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.string :text, null: false
      t.string :details
      t.string :category #, t.integer
      t.integer :user_id #, null: false

      t.timestamps null: false
    end
  end
end
