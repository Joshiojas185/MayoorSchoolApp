const express = require("express");
const WebSocket = require("ws");
const db = require("./database");

const app = express();
// const PORT = 5000;
// const WSPORT = 3500;
const PORT = process.env.PORT || 5000;  // Use Railway's assigned port or fallback to 5000
const WSPORT = process.env.WSPORT || 3500;  // Use a different port for WebSocket or fallback to 3500


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

let activeTeachers = {};
console.log("hhhhhhhhhhhhh",activeTeachers)
wss.on("connection", (ws) => {
  console.log("🔵 New client connected");

  ws.on("message", (message) => {
    const teacherName = message.toString().trim();

    if (teacherName) {
      // Get current time in full timestamp (DATETIME)
      const currentTime = new Date();

      db.query(
        "INSERT INTO teachers (name, status, last_seen) VALUES (?, 'active', ?) ON DUPLICATE KEY UPDATE status='active', last_seen=?",
        [teacherName, currentTime, currentTime],
        (err) => {
          if (err) {
            console.error("Error inserting/updating teacher in DB:", err);
            return;
          }
          activeTeachers[teacherName] = ws;
          console.log( "Active teachers : ",activeTeachers)
          sendUpdatedList();
        }
      );
    }
  });

  ws.on("close", () => {
    console.log(activeTeachers)
    for (let teacher in activeTeachers) {
      if (activeTeachers[teacher] === ws) {
        // Set last seen time to current timestamp when teacher disconnects
        const lastSeenTime = new Date();

        db.query("UPDATE teachers SET status='inactive', last_seen=? WHERE name=?", [lastSeenTime, teacher], (err) => {
          if (err) {
            console.error("Error updating teacher status in DB:", err);
          }
          delete activeTeachers[teacher];
          sendUpdatedList();
        });
      }
    }
    console.log("🔴 A client disconnected");
  });
});

// Function to send updated teacher list to all connected clients
function sendUpdatedList() {
  db.query(
    "SELECT name, status, last_seen FROM teachers", // Fetch full DATETIME
    (err, results) => {
      if (err) {
        console.error("Error fetching teacher list from DB:", err);
        return;
      }

      const formattedResults = results.map((teacher) => {
        const lastSeen = new Date(teacher.last_seen);
        const currentDate = new Date();

        // Check if the date is today
        if (lastSeen.toDateString() === currentDate.toDateString()) {
          // If it's today, only show the time
          teacher.last_seen = lastSeen.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
          // If it's not today, show the day and time
          const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
          teacher.last_seen = lastSeen.toLocaleString('en-US', options);
        }
        return teacher;
      });

      console.log("Sending updated teacher list:", formattedResults);
      const data = JSON.stringify(formattedResults);

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    }
  );
}