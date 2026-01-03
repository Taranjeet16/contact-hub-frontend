Contact Hub – Frontend

Frontend application for the Contact Management Web App, built using React.js and deployed on Vercel.

This project consumes a REST API built with Node.js, Express, and MongoDB.

🚀 Live Demo

🔗 Frontend URL (Vercel)
https://contact-hub-frontend.vercel.app/

🛠 Tech Stack

React.js

Vite

Tailwind CSS

React Query

Shadcn UI

🔗 Backend API

The frontend communicates with the backend deployed on Render:

🔗 API Base URL
https://contact-hub-backend.onrender.com/api

✨ Features

Contact form with client-side validation

Fields:

Name (required)

Email (valid format)

Phone (required)

Category (optional)

Message (optional)

Display contacts without page reload

Update and delete contacts

Responsive UI

Error and success notifications

▶️ Run Locally
Responsive UI
npm install
npm run dev

The app will run at:
http://localhost:5173

Make sure the backend server is running locally or update the API URL accordingly.

📁 Project Structure
src/
├── components/
├── pages/
├── services/
│   └── api.ts
├── types/
└── App.tsx

⚙️ Configuration

The API base URL is defined in:
src/services/api.ts
const API_BASE_URL = "https://contact-hub-backend.onrender.com/api";

👤 Author
Taranjeet Singh
B.Tech – Computer Science & Engineering
Aspiring MERN Stack Developer

✅ Notes
This repository contains frontend-only code
Full-stack version is available in the combined repository:
https://github.com/Taranjeet16/contact-hub

Error and success notifications

▶️ Run Locally
