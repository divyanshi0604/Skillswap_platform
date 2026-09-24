# 🚀 SkillSwap

## 📌 Project Overview
SkillSwap is a full-stack peer-to-peer learning platform that helps users exchange skills with one another. Users can create profiles, showcase the skills they can teach, list the skills they want to learn, explore other members, and send exchange requests to start collaborative learning.

The platform is designed to make learning more accessible, community-driven, and practical by connecting people who have complementary knowledge. The application is now live and accessible via the deployed links below.

## 🌐 Live Demo

**Frontend:** https://skillswap-five-green.vercel.app/
**Backend:** https://skillswap-3s9t.onrender.com  
**API Documentation (Postman):** https://documenter.getpostman.com/view/50840833/2sBYAxRq52  
**Demo Video:** https://youtu.be/OCD35fF72mY?si=YpnYoqYwIGnS1bOh  

> ⚠️ **Note:** The backend is deployed on a free hosting service, so it may take **30–120 seconds** to respond on the first request due to server cold starts. Please wait briefly if the app takes time to load initially.

## ❗ Problem Statement
Many people want to learn new skills but face barriers such as expensive courses, limited access to mentors, or lack of a supportive learning network. At the same time, many individuals already have valuable knowledge they are willing to share. Despite this, there is no simple and community-focused platform that helps people connect and exchange skills effectively.

## 💡 Proposed Solution
SkillSwap solves this problem by providing a platform where users can teach what they know and learn what they need through direct skill exchange. Instead of relying only on paid learning resources, users can connect with others who offer complementary skills, build mutually beneficial relationships, and grow together through knowledge sharing.

## ✨ Key Features
- 🔐 User authentication with signup and login
- 👤 User profile management
- 🛍️ Skills marketplace to explore available skills
- 🤝 Skill exchange request system
- 📊 Personalized dashboard for user activity
- 🔎 Search functionality for discovering skills and users
- 🧭 Filtering and sorting for better exploration
- 📄 Pagination for scalable data browsing
- 🛠️ Full CRUD operations for skills
- 🌗 Light and dark theme support
- 📱 Fully responsive design for desktop, tablet, and mobile

## 🧰 Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React.js, Tailwind CSS, React Router, Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB |

## 📄 Application Pages

| Page | Description |
| --- | --- |
| Home | Landing page with platform introduction and key actions |
| Signup | User registration page |
| Login | User authentication page |
| Dashboard | Overview of user activity, requests, and skills |
| Profile | User details, teachable skills, and learning interests |
| Skills Marketplace | Browse, search, filter, and explore listed skills |
| Requests Management | View, accept, reject, and track exchange requests |

## 🔄 System Workflow
1. A new user signs up and creates an account.
2. The user updates their profile with skills they can teach and skills they want to learn.
3. Other users search the marketplace using filters, sorting, and search.
4. A user sends a skill exchange request to another user with complementary skills.
5. The recipient reviews the request and accepts or rejects it.
6. Once accepted, both users can connect and begin the knowledge exchange.
7. Users manage their ongoing activity through the dashboard and requests pages.

## ⚙️ Installation & Setup

*Alternatively, you can access the live application using the [Live Demo](#-live-demo) links above without local setup.*

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/skillswap.git
cd skillswap
```

### 2. Install Dependencies
If your project uses separate frontend and backend folders, install dependencies in both:

```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory and add the required variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the Application
Start the backend server:

```bash
cd backend
npm run dev
```

Start the frontend development server:

```bash
cd frontend
npm run dev
```

### 5. Open in Browser
Visit:

```bash
http://localhost:5173
```

## 🚀 Future Improvements
- 💬 Real-time chat between matched users
- ⭐ Ratings and reviews for skill exchange sessions
- 📅 Session scheduling and calendar integration
- 🔔 Notification system for requests and updates
- 🧠 AI-based skill recommendations
- 🌍 Location-based or language-based matching
- 📹 Video call integration for remote learning sessions

## 👨‍💻 Author
**Patel Jivan**
