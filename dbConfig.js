const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "naveen123",
  database:  "nodejs2"
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
  