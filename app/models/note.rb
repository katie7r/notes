# == Schema Information
#
# Table name: notes
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  text       :string           not null
#  details    :string
#  category   :string
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Note < ActiveRecord::Base
end
