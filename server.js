// const express = require("express");
// const WebSocket = require("ws");
// const db = require("./database");

// const app = express();
// // const PORT = 5000;
// // const WSPORT = 3500;
// const PORT = process.env.PORT || 5000;  // Use Railway's assigned port or fallback to 5000
// const WSPORT = process.env.WSPORT || 3500;  // Use a different port for WebSocket or fallback to 3500


// // Serve frontend files
// app.use(express.static("frontend"));



// // Start HTTP Server
// // const server = app.listen(PORT, () => {
// //   console.log(`✅ Server is running on http://localhost:${PORT}`);
// // });

// const server = app.listen(PORT, "0.0.0.0", () => {
//   console.log(`✅ Server is running on http://localhost:${PORT}`);
// });

// // WebSocket Server
// // const wss = new WebSocket.Server({ port: WSPORT }, () => {
// //   console.log(`✅ WebSocket server is running on ws://localhost:${WSPORT}`);
// // });
// const wss = new WebSocket.Server({ server });
// console.log(`✅ WebSocket server is running`);

// let activeTeachers = {};
// wss.on("connection", (ws) => {
//   console.log("🔵 New client connected");

//   ws.on("message", (message) => {
//     const teacherName = message.toString().trim();

//     if (teacherName) {
//       // Get current time in full timestamp (DATETIME)
//       const currentTime = new Date();

//       db.query(
//         "INSERT INTO teachers (name, status, last_seen) VALUES (?, 'active', ?) ON DUPLICATE KEY UPDATE status='active', last_seen=?",
//         [teacherName, currentTime, currentTime],
//         (err) => {
//           if (err) {
//             console.error("Error inserting/updating teacher in DB:", err);
//             return;
//           }
//           activeTeachers[teacherName] = ws;
//           console.log( "Active teachers : ",activeTeachers)
//           sendUpdatedList();
//         }
//       );
//     }
//   });

//   ws.on("close", () => {
//     console.log(activeTeachers)
//     for (let teacher in activeTeachers) {
//       if (activeTeachers[teacher] === ws) {
//         // Set last seen time to current timestamp when teacher disconnects
//         const lastSeenTime = new Date();

//         db.query("UPDATE teachers SET status='inactive', last_seen=? WHERE name=?", [lastSeenTime, teacher], (err) => {
//           if (err) {
//             console.error("Error updating teacher status in DB:", err);
//           }
//           delete activeTeachers[teacher];
//           sendUpdatedList();
//         });
//       }
//     }
//     console.log("🔴 A client disconnected");
//   });
// });

// // Function to send updated teacher list to all connected clients
// function sendUpdatedList() {
//   db.query(
//     "SELECT name, status, last_seen FROM teachers", // Fetch full DATETIME
//     (err, results) => {
//       if (err) {
//         console.error("Error fetching teacher list from DB:", err);
//         return;
//       }

//       const formattedResults = results.map((teacher) => {
//         const lastSeen = new Date(teacher.last_seen);
//         const currentDate = new Date();

//         // Check if the date is today
//         if (lastSeen.toDateString() === currentDate.toDateString()) {
//           // If it's today, only show the time
//           teacher.last_seen = lastSeen.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         } else {
//           // If it's not today, show the day and time
//           const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
//           teacher.last_seen = lastSeen.toLocaleString('en-US', options);
//         }
//         return teacher;
//       });

//       console.log("Sending updated teacher list:", formattedResults);
//       const data = JSON.stringify(formattedResults);

//       wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(data);
//         }
//       });
//     }
//   );
// }


// AFTER 1st COMMMIT 
// const express = require("express");
// const WebSocket = require("ws");
// const db = require("./database");
// const moment = require("moment-timezone");  // Import moment-timezone

// const app = express();
// const PORT = process.env.PORT || 5000;
// const WSPORT = process.env.WSPORT || 3500;

// // Serve frontend files
// app.use(express.static("frontend"));

// // Start HTTP Server
// const server = app.listen(PORT, "0.0.0.0", () => {
//   console.log(`✅ Server is running on http://localhost:${PORT}`);
// });

// // WebSocket Server
// const wss = new WebSocket.Server({ server });
// console.log(`✅ WebSocket server is running`);

// let activeTeachers = {};

// wss.on("connection", (ws) => {
//   console.log("🔵 New client connected");

//   ws.on("message", (message) => {
//     const teacherName = message.toString().trim();

//     if (teacherName) {
//       // Convert to IST before storing in database
//       const currentTimeIST = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//       db.query(
//         "INSERT INTO teachers (name, status, last_seen) VALUES (?, 'active', ?) ON DUPLICATE KEY UPDATE status='active', last_seen=?",
//         [teacherName, currentTimeIST, currentTimeIST],
//         (err) => {
//           if (err) {
//             console.error("Error inserting/updating teacher in DB:", err);
//             return;
//           }
//           activeTeachers[teacherName] = ws;
//           sendUpdatedList();
//         }
//       );
//     }
//   });

//   ws.on("close", () => {
//     for (let teacher in activeTeachers) {
//       if (activeTeachers[teacher] === ws) {
//         // Convert to IST before updating in database
//         const lastSeenTimeIST = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//         db.query("UPDATE teachers SET status='inactive', last_seen=? WHERE name=?", [lastSeenTimeIST, teacher], (err) => {
//           if (err) {
//             console.error("Error updating teacher status in DB:", err);
//           }
//           delete activeTeachers[teacher];
//           sendUpdatedList();
//         });
//       }
//     }
//     console.log("🔴 A client disconnected");
//   });
// });

// // Function to send updated teacher list to all connected clients
// function sendUpdatedList() {
//   db.query(
//     "SELECT name, status, last_seen FROM teachers",
//     (err, results) => {
//       if (err) {
//         console.error("Error fetching teacher list from DB:", err);
//         return;
//       }

//       const formattedResults = results.map((teacher) => {
//         const lastSeenIST = moment(teacher.last_seen).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//         const lastSeen = new Date(lastSeenIST);
//         const currentDate = new Date();

//         // Check if the date is today
//         if (lastSeen.toDateString() === currentDate.toDateString()) {
//           teacher.last_seen = lastSeen.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//         } else {
//           const options = { weekday: "short", hour: "2-digit", minute: "2-digit" };
//           teacher.last_seen = lastSeen.toLocaleString("en-US", options);
//         }
//         return teacher;
//       });

//       console.log("Sending updated teacher list:", formattedResults);
//       const data = JSON.stringify(formattedResults);

//       wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(data);
//         }
//       });
//     }
//   );
// }


//STORING TIME IN IST

//Rollback Commit before email

// const express = require("express");
// const WebSocket = require("ws");
// const db = require("./database");
// const moment = require("moment-timezone");  // Import moment-timezone

// const app = express();
// const PORT = process.env.PORT || 5000;
// const WSPORT = process.env.WSPORT || 3500;

// // Serve frontend files
// app.use(express.static("frontend"));

// // Start HTTP Server
// const server = app.listen(PORT, "0.0.0.0", () => {
//   console.log(`✅ Server is running on http://localhost:${PORT}`);
// });

// // WebSocket Server
// const wss = new WebSocket.Server({ server });
// console.log(`✅ WebSocket server is running`);

// let activeTeachers = {};

// wss.on("connection", (ws) => {
//   console.log("🔵 New client connected");

//   ws.on("message", (message) => {
//     const teacherName = message.toString().trim();

//     if (teacherName) {
//       // Convert to UTC before storing in database
//       const currentTimeUTC = moment().utc().format("YYYY-MM-DD HH:mm:ss");

//       db.query(
//         "INSERT INTO teachers (name, status, last_seen) VALUES (?, 'active', ?) ON DUPLICATE KEY UPDATE status='active', last_seen=?",
//         [teacherName, currentTimeUTC, currentTimeUTC],
//         (err) => {
//           if (err) {
//             console.error("Error inserting/updating teacher in DB:", err);
//             return;
//           }
//           activeTeachers[teacherName] = ws;
//           sendUpdatedList();
//         }
//       );
//     }
//   });

//   ws.on("close", () => {
//     for (let teacher in activeTeachers) {
//       if (activeTeachers[teacher] === ws) {
//         // Convert to UTC before updating in database
//         const lastSeenTimeUTC = moment().utc().format("YYYY-MM-DD HH:mm:ss");

//         db.query("UPDATE teachers SET status='inactive', last_seen=? WHERE name=?", [lastSeenTimeUTC, teacher], (err) => {
//           if (err) {
//             console.error("Error updating teacher status in DB:", err);
//           }
//           delete activeTeachers[teacher];
//           sendUpdatedList();
//         });
//       }
//     }
//     console.log("🔴 A client disconnected");
//   });
// });

// // Function to send updated teacher list to all connected clients
// function sendUpdatedList() {
//   db.query(
//     "SELECT name, status, last_seen FROM teachers",
//     (err, results) => {
//       if (err) {
//         console.error("Error fetching teacher list from DB:", err);
//         return;
//       }

//       const formattedResults = results.map((teacher) => {
//         // Convert UTC to IST
//         const lastSeenIST = moment(teacher.last_seen).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//         const lastSeen = new Date(lastSeenIST);
//         const currentDate = new Date();

//         // Check if the date is today
//         if (lastSeen.toDateString() === currentDate.toDateString()) {
//           teacher.last_seen = lastSeen.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//         } else {
//           const options = { weekday: "short", hour: "2-digit", minute: "2-digit" };
//           teacher.last_seen = lastSeen.toLocaleString("en-US", options);
//         }
//         return teacher;
//       });

//       console.log("Sending updated teacher list:", formattedResults);
//       const data = JSON.stringify(formattedResults);

//       wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(data);
//         }
//       });
//     }
//   );
// }


//Commit for adding email

const express = require("express");
const WebSocket = require("ws");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 5000; // Use Railway's assigned port or fallback to 5000
const WSPORT = process.env.WSPORT || 3500; // Use a different port for WebSocket or fallback to 3500

// Serve frontend files
app.use(express.static("frontend"));

// Start HTTP Server
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

// WebSocket Server
const wss = new WebSocket.Server({ port: WSPORT }, () => {
  console.log(`✅ WebSocket server is running on ws://localhost:${WSPORT}`);
});

// Store active teachers
let activeTeachers = {};

// WebSocket Connection Handling
wss.on("connection", (ws) => {
  console.log("🔵 New client connected");

  ws.on("message", (message) => {
    try {
      const { name, email } = JSON.parse(message); // Expect JSON input
      if (name && email) {
        const currentTime = new Date();

        db.query(
          "INSERT INTO teachers (name, email, status, last_seen) VALUES (?, ?, 'active', ?) ON DUPLICATE KEY UPDATE status='active', last_seen=?",
          [name, email, currentTime, currentTime],
          (err) => {
            if (err) {
              console.error("❌ Error inserting/updating teacher in DB:", err);
              return;
            }
            activeTeachers[`${name}_${email}`] = ws;
            sendUpdatedList();
          }
        );
      }
    } catch (error) {
      console.error("❌ Invalid message format:", error);
    }
  });

  ws.on("close", () => {
    for (let key in activeTeachers) {
      if (activeTeachers[key] === ws) {
        const [name, email] = key.split("_");
        const lastSeenTime = new Date();

        db.query(
          "UPDATE teachers SET status='inactive', last_seen=? WHERE name=? AND email=?",
          [lastSeenTime, name, email],
          (err) => {
            if (err) {
              console.error("❌ Error updating teacher status in DB:", err);
            }
            delete activeTeachers[key];
            sendUpdatedList();
          }
        );
      }
    }
    console.log("🔴 A client disconnected");
  });
});

// Function to send updated teacher list to all clients
function sendUpdatedList() {
  db.query("SELECT name, email, status, last_seen FROM teachers", (err, results) => {
    if (err) {
      console.error("❌ Error fetching teacher list from DB:", err);
      return;
    }

    const formattedResults = results.map((teacher) => {
      const lastSeen = new Date(teacher.last_seen);
      const currentDate = new Date();

      if (lastSeen.toDateString() === currentDate.toDateString()) {
        teacher.last_seen = lastSeen.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        teacher.last_seen = lastSeen.toLocaleString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
      }
      return teacher;
    });

    console.log("📢 Sending updated teacher list:", formattedResults);
    const data = JSON.stringify(formattedResults);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
}
