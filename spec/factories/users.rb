FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password(min_length: 8) }
    manager_id { 1 }
    user_name { 'Sample name' }
    address { Faker::Address.full_address }
    dob { Faker::Date.birthday(min_age: 18, max_age: 45) }
  end
end
