const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const args = process.argv.slice(2);
const firstName = args[0];
const lastName = args[1];
const dateOfBirth = args[2];

function addPerson(firstName, lastName, dateOfBirth){

  knex('famous_people')
    .insert({first_name: firstName,
             last_name: lastName,
             birthdate: dateOfBirth})
    .returning('*')
    .catch(err => console.log(err.message))
    .then(function() {knex.destroy()});
};

addPerson(firstName, lastName, dateOfBirth);

