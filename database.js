// const mysql = require('mysql');

// // MySQL Database Connection
// // const db = mysql.createConnection({
// //   host: "localhost",
// //   user: "root",
// //   password: "",
// //   database: "teachers_db"
// // });
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",  // Use Railway's DB_HOST if available
//   user: process.env.DB_USER || "root",      // Use Railway's DB_USER if available
//   password: process.env.DB_PASSWORD || "",  // Use Railway's DB_PASSWORD if available
//   database: process.env.DB_NAME || "teachers_db"
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//     return;
//   }
//   console.log("✅ MySQL Connected");
// });

// module.exports = db;


//FOR DEPLOYMENT
// const mysql = require("mysql2");
// // Create a MySQL connection using Clever Cloud credentials
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "bvyx3kxnlz1n4stvraap-mysql.services.clever-cloud.com",
//   user: process.env.DB_USER || "ueypdxzyyxpuszrr",
//   password: process.env.DB_PASSWORD || "zk4RMpbk627DHvSP0b15",
//   database: process.env.DB_NAME || "bvyx3kxnlz1n4stvraap",
//   port: process.env.DB_PORT || 3306, // Default MySQL port
//   multipleStatements: true,
//   waitForConnections: true, // Wait for a connection if the pool is full
//   connectionLimit: 100, // Set the maximum number of connections in the pool
//   queueLimit: 0
// });
// // Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     console.error(":x: Database connection failed:", err);
//     return;
//   }
//   console.log(":white_check_mark: Connected to Clever Cloud MySQL!");
// });
// module.exports = db; 


const mysql = require("mysql2");

// Create a MySQL connection for local development
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",  // Use localhost for local development
  user: process.env.DB_USER || "root",      // Default MySQL user for localhost
  password: process.env.DB_PASSWORD || "",  // Enter your MySQL root password here (if any)
  database: process.env.DB_NAME || "teacherDB",  // Replace with your local DB name
  port: process.env.DB_PORT || 3306,        // Default MySQL port
  multipleStatements: true,
  waitForConnections: true, // Wait for a connection if the pool is full
  connectionLimit: 100,     // Set the maximum number of connections in the pool
  queueLimit: 0
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error(":x: Database connection failed:", err);
    return;
  }
  console.log(":white_check_mark: Connected to local MySQL!");
});

module.exports = db;
