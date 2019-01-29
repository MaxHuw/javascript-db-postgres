const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const args = process.argv.slice(2);
const searchName = args[0];
console.log(searchName);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log("Searching...");

  const query = {
    text: `SELECT * FROM famous_people WHERE first_name = ($1::text) OR last_name = ($1::text)`,
    values: [searchName]
  };

  console.log(query.values);

  client.query(query.text, query.values, (err, res) => {
    if (err) {
      console.log(err.stack);
      client.end();
    } else {
      console.log("Found " + res.rows.length + " person(s) by the name " + searchName + ":" );
      let count = 1;
      for (row of res.rows){
        let birthday = (row.birthdate).toString().slice(0, 15);
        console.log(count + " - " + row.first_name + " " + row.last_name + ", born " + birthday);
        count ++;
      }
      client.end();
    }
  });
});