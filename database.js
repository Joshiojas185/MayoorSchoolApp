const mysql = require('mysql');

// MySQL Database Connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "teachers_db"
// });
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",  // Use Railway's DB_HOST if available
  user: process.env.DB_USER || "root",      // Use Railway's DB_USER if available
  password: process.env.DB_PASSWORD || "",  // Use Railway's DB_PASSWORD if available
  database: process.env.DB_NAME || "teachers_db"
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected");
});

module.exports = db;
