
# AffordMed Full Stack Submission – Yash Kansal (Roll No: 80)

## 🔧 Project Overview
This project implements a complete Full Stack URL Shortener Microservice with:
- Authentication via clientId/clientSecret
- URL shortening with optional custom shortcodes
- Expiry handling
- Redirection + stats tracking
- Frontend UI using React + Material UI

---

## 📁 Folder Structure

80/
├── Logging Middleware/
├── Backend/
├── Frontend/

yaml
Copy
Edit

---

## 📌 Setup Instructions

### 🔹 1. Logging Middleware
- Located in `Logging Middleware/index.js`
- Used in both backend and frontend to log:
  - HTTP method
  - Timestamp
  - URL
  - Response time

### 🔹 2. Backend
- Install dependencies:
  ```bash
  cd Backend
  npm install
Set up MongoDB in urlModel.js

Run the server:

bash
Copy
Edit
node server.js
🔹 3. Frontend
Create .env:

ini
Copy
Edit
REACT_APP_BACKEND_URL=http://localhost:3000
REACT_APP_CLIENT_ID=yourClientID
REACT_APP_CLIENT_SECRET=yourClientSecret
Install and run:

bash
Copy
Edit
cd Frontend
npm install
npm start
📲 API Routes
POST /shorturls
Body:

json
Copy
Edit
{
  "url": "https://example.com",
  "shortcode": "optional-code",
  "validity": 30
}
GET /shorturls/:shortcode
Returns stats for that URL

GET /:shortcode
Redirects to original URL

🛠️ Tools & Tech
Frontend: React, Material UI

Backend: Node.js, Express, MongoDB

Logging: Custom middleware

✅ Completed Features
 Auth using headers

 URL shortening

 Stats tracking (clicks, IP, referer)

 Expiry logic

 Custom shortcodes

 Logs saved in logs.txt & console

 Functional UI

yaml
Copy
Edit

---

# 📸 Screenshot Examples (what to capture)

Create a folder called `screenshots/` and include:
- Shortener page working (form filled + results)
- Stats page showing stats
- Terminal showing logs
- MongoDB Compass view (optional)
- Screenshot of pushed repo + README

---

# ✅ Final Submission – GitHub Push

### ⚠️ IMPORTANT RULES:
- Repo name: `80` (your roll number)
- Branch: `main` only
- Commit message: `Initial full stack project submission – Yash Kansal`
- Push all 3 folders into root
- Include `.env.example`, not real `.env`

---

### ✅ Push Command:
```bash
cd ~/Desktop/80
git init
git remote add origin https://github.com/Kansal-ji/80.git
git add .
git commit -m "Initial full stack project submission – Yash Kansal"
git branch -M main
git push -u origin main