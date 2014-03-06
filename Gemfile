source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0'

# Use sqlite3 as the database for Active Record

gem 'devise'

group :production do
  #gem 'pg'
  gem 'rails_12factor'
  gem 'unicorn'
end
group :development, :test do
  gem 'sqlite3'
end

gem 'aws-sdk'
gem "aws-s3"

gem "http_connection", "~> 1.4.4"
gem 'multi_json'

gem 'bcrypt-ruby'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

gem 'paperclip', '~> 3.0'

gem 'loadjs'

gem 'filepicker-rails'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
#gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
#gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

gem 'meta_request'

gem 'binding_of_caller'

gem 'sass-rails', '>= 3.2' # sass-rails needs to be higher than 3.2
gem 'bootstrap-sass', '~> 2.3.2.1'

gem 'font-awesome-sass'

gem 'better_errors'

gem 'annotate'

gem 'timeliness'

gem 'validates_timeliness', '~> 3.0'

#gem 'analytics-ruby', '<1.0'

gem 'analytics-ruby', '<1.0'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end


ruby '2.0.0'


# Use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]
