# 🎶 Hackathon2025_Chor.us.Final

**Chor.us** — A social hub for concert fans to connect, explore local spots, and collaborate on fan projects.  
Built during **HackUTD 2025**.

---

## 🌟 Overview
Chor.us connects music lovers heading to the same concerts.  
Users can browse events, join fan chats, and generate AI-powered pre-concert plans — all from one hub.  
The app combines **React + Firebase + Node.js** to deliver a smooth, interactive experience with real-time data.

---

## 🚀 Features

### 🧭 Concert Dashboard
- Browse upcoming concerts and artists  
- See key event info like **venue**, **date**, and **local amenities**  
- “View Event” cards with artist photos and quick access buttons

### 💬 Group Chat
- Real-time fan chat built with **Firebase Realtime Database**  
- Clean bubble-style layout with avatar support  
- Automatically generates responses to simulate engagement  

### 🗓️ SwiftPlanner (AI Schedule Generator)
- Node.js–powered logic to generate **pre-concert itineraries**  
- Suggests:
  - Restaurant options 🍽️  
  - Local attractions 🏙️  
  - Arrival and dinner times  
- Scrollable output with compact, easy-to-read summaries  

### 🎨 Fan Projects
- A creative community hub for:
  - Poster collabs 🎨  
  - Bracelet swaps 💫  
  - Carpool threads 🚗  

---

## 🛠️ Tech Stack
| Category | Technologies Used |
|-----------|------------------|
| **Frontend** | React + Vite |
| **Backend** | Node.js + Firebase |
| **Tools** | GitHub, Visual Studio Code |
| **APIs / Data** | Mock concert data, AI schedule generator |

---

## 📂 Project Structure
├── chourus-frontend/
│ ├── src/
│ │ ├── components/ # Navbar, ConcertCard, FakeChat, SwiftPlanner, FanProjects
│ │ ├── pages/ # Home, Profile, Login
│ │ └── assets/ # Images, icons
│ ├── App.jsx
│ ├── App.css
│ └── index.html
├── server/
│ ├── index.js # Node.js backend setup
│ ├── firebaseConfig.js # Firebase connection
│ └── routes/ # (optional endpoints)
├── README.md
└── LICENSE
