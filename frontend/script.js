// const teacherList = document.getElementById("teacher-list");
// const teacherNameInput = document.getElementById("teacher-name");
// const joinButton = document.getElementById("join-btn");

// // WebSocket connection
// // const ws = new WebSocket("ws://localhost:3500");
// const ws = new WebSocket(`ws://${window.location.hostname}:${process.env.WSPORT || 3500}`);
// ws.onopen = () => {
//   console.log("Connected to WebSocket server.");
// };

// ws.onmessage = (event) => {
//   console.log("Received data:", event.data);
//   const teachers = JSON.parse(event.data);
//   teacherList.innerHTML = ''; // Clear the list before adding updated data

//   teachers.forEach((teacher) => {
//     const div = document.createElement("div");
//     div.className = "teacher";

//     const statusDot = document.createElement("span");
//     const lastSeenSpan = document.createElement("span");

//     if (teacher.status === 'active') {
//       statusDot.className = "green-dot";
//     } else {
//       lastSeenSpan.className = "last-seen";
//       const formattedTime = teacher.last_seen ? teacher.last_seen : "N/A";
//       lastSeenSpan.textContent = `Last seen: ${formattedTime}`;
//     }

//     div.textContent = teacher.name;
//     div.prepend(statusDot);
//     div.appendChild(lastSeenSpan);
//     teacherList.appendChild(div);
//   });
// };

// ws.onclose = () => {
//   console.log("Disconnected from WebSocket server.");
// };

// // Join button event listener
// joinButton.addEventListener("click", () => {
//   const teacherName = teacherNameInput.value.trim();
//   if (teacherName) {
//     ws.send(teacherName);
//     teacherNameInput.value = ''; // Clear the input after sending the name
//   }
// });






// const teacherList = document.getElementById("teacher-list");
// const teacherNameInput = document.getElementById("teacher-name");
// const joinButton = document.getElementById("join-btn");

// // Automatically use 'wss://' for HTTPS and 'ws://' for local development
// const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
// const ws = new WebSocket(`${wsProtocol}${window.location.host}`); // No manual port in production

// ws.onopen = () => {
//   console.log("✅ Connected to WebSocket server.");
// };

// ws.onmessage = (event) => {
//   console.log("📩 Received data:", event.data);
//   const teachers = JSON.parse(event.data);
//   teacherList.innerHTML = ""; // Clear the list before updating

//   teachers.forEach((teacher) => {
//     const div = document.createElement("div");
//     div.className = "teacher";

//     const statusDot = document.createElement("span");
//     const lastSeenSpan = document.createElement("span");

//     if (teacher.status === "active") {
//       statusDot.className = "green-dot";
//       statusDot.textContent = "🟢 ";
//     } else {
//       lastSeenSpan.className = "last-seen";
//       lastSeenSpan.textContent = `Last seen: ${teacher.last_seen || "N/A"}`;
//     }

//     div.textContent = teacher.name;
//     div.prepend(statusDot);
//     div.appendChild(lastSeenSpan);
//     teacherList.appendChild(div);
//   });
// };

// ws.onclose = () => {
//   console.log("🔴 Disconnected from WebSocket server.");
// };

// ws.onerror = (error) => {
//   console.error("❌ WebSocket Error:", error);
// };

// // Join button event listener
// joinButton.addEventListener("click", () => {
//   const teacherName = teacherNameInput.value.trim();
//   if (teacherName) {
//     ws.send(teacherName);
//     teacherNameInput.value = ""; // Clear input after sending
//   }
// });
