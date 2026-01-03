# Contact Management Web App

A Contact Management Web Application built using the **MERN stack** as part of a Web Developer interview assignment.  
The application demonstrates core MERN fundamentals with clean UI, REST APIs, and MongoDB integration.

---

## 🚀 Features

### Core Features
- Add new contacts with client-side validation
- Fields:
  - Name (required)
  - Email (valid format)
  - Phone (required)
  - Category (optional)
  - Message (optional)
- Store contacts in MongoDB
- Display contacts in a list without page reload
- Edit and update existing contacts
- Delete contacts
- Responsive and clean UI

### Bonus Features
- Contact categories with visual tags
- Search contacts by name, email, or phone
- Sort contacts
- Export contacts to CSV
- Category, edit, search, and export are bonus features.

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)

---

## 📁 Project Structure

frontend/
backend/

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /api/contacts | Fetch all contacts |
| POST | /api/contacts | Create a new contact |
| PUT | /api/contacts / /api/contacts/:id | Update an existing contact |
| PATCH | /api/contacts/:id | Partially update a contact |
| DELETE | /api/contacts/:id | Delete a contact |

---

## 🧪 Validation Rules

- Name and Phone are required
- Email must be in valid format
- Submit button is disabled when the form is invalid

---

## ▶️ Run Project Locally

### Frontend
cd frontend
npm install
npm run dev

### Backend
cd backend
npm install
npm run dev

Create a .env file in the backend directory:
MONGO_URI=your_mongodb_connection_string
PORT=5000

🌐 Deployment
Frontend: Vercel / Netlify
Backend: Render / Railway
Database: MongoDB Atlas

👤 Author
Taranjeet Singh
B.Tech Computer Science & Engineering
Aspiring MERN Stack Developer