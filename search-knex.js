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
const searchName = args[0];

function displayResults(result){
  console.log("Found " + result.length + " person(s) by the name " + searchName + ":" );
  let count = 1;
  for (row of result){
    let birthday = (row.birthdate).toString().slice(0, 15);
    console.log(count + " - " + row.first_name + " " + row.last_name + ", born " + birthday);
    count ++;
  }
}


function searchQuery(searchName){

  knex('famous_people')
    .select('*')
    .where('first_name', searchName)
    .orWhere('last_name', searchName)
    .asCallback((err, rows) => {
          displayResults(rows);
          knex.destroy();
    })
};

searchQuery(searchName);


