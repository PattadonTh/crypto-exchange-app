const db = require("./db/connection");

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)");
  db.run("INSERT INTO test (name) VALUES (?)", ["hello sqlite"]);
  db.each("SELECT * FROM test", (err, row) => {
    if (err) console.error(err);
    else console.log("Row:", row);
  });
});
