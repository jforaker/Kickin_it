# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Kick.create title: 'Beers at Joes Bar.',
             description: 'We are meeting at Joes Bar to celebrate Tims bday',
             time: 830

Kick.create title: 'Rangers game at Finnertys',
            description: 'Rangers vs Sharks at the bar',
            time: 700

Kick.create title: 'Beers at Joes Bar.',
            description: 'We are meeting at Joes Bar to celebrate Tims bday',
            time: 830

Kick.create title: 'Rangers game at Finnertys',
            description: 'Rangers vs Sharks at the bar',
            time: 700, location: ''
