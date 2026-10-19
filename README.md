# 🚀 Muthu A. — MERN Stack Technical Portfolio Website

A deployable, production-ready full-stack portfolio website built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). 

This application showcases the complete technical skills inventory, CS fundamentals, and practical projects documented in the **Technical Skills Profile**, featuring a modern cyber dark glassmorphic design, interactive terminal CLI, project architecture modals, and live REST API endpoints.

---

## 🌟 Highlights & Key Features

- **Full MERN Stack Architecture**: Unified production deployment where Node.js / Express serves both REST APIs (`/api/*`) and the high-performance React single-page application.
- **Resilient MongoDB Atlas Integration**: Connects to cloud MongoDB Atlas via Mongoose with an automatic, zero-crash in-memory fallback mode if credentials are not yet configured.
- **Skills Matrix with Authentic Demarcation**: Complete inventory of programming languages, web development, databases, and AI/ML with category filters, search bar, and distinct categorization between *Proficient / Hands-on* skills and *Exploratory Learning Targets*.
- **Featured Projects Showcase**:
  1. **Personal Expense Tracker (MERN)** — Full-stack CRUD finance app with MongoDB Atlas integration and budget analytics.
  2. **AI Disease Prediction Platform** — Clinical symptom classification and machine learning model-to-app bridge.
  3. **Wine Quality Data Analysis & Power BI Dashboard** — Statistical analysis with Pandas, Seaborn, and executive dashboarding.
  4. **Unity 3D Game Prototype** — Playable 3D prototype with C# player physics and mechanics.
  5. **Hackathon Concepts** — Smart India Hackathon AI Timetable Generator and SAVER Emergency Transit corridor.
- **Core Computer Science Rigor**: Interactive visualizers for **DBMS Normalization (1NF → 2NF → 3NF → BCNF)**, **Two-Phase Locking (2PL)**, **AVL Tree Self-Balancing Rotations**, and **ARM 5-Stage CPU Pipelining**.
- **Interactive Developer Terminal (CLI)**: In-browser terminal emulator executing commands (`skills`, `projects`, `dsa`, `whoami`, `cat resume`, and `test-api` which executes live HTTP fetch requests to the Express server).
- **Working Contact Submission**: Direct communication via `POST /api/contact` with validation, toast alerts, and confetti animation.

---

## 🏗️ Project Architecture

```
Portfolio_Website/
├── client/                     # Frontend: React 18 + Vite + Vanilla CSS Glassmorphism
│   ├── index.html              # HTML5 SEO, OpenGraph tags, Google Fonts
│   ├── vite.config.js          # Vite config with API proxy
│   ├── src/
│   │   ├── main.jsx            # React root mount
│   │   ├── App.jsx             # Main container with live backend sync
│   │   ├── index.css           # Custom design system & animations
│   │   ├── components/         # Navbar, Hero, Skills, Projects, CS, Terminal, Contact, Footer
│   │   └── data/               # Local data store fallback
├── server/                     # Backend: Node.js + Express + Mongoose
│   ├── server.js               # Main Express entrypoint (CORS, Morgan, Static serving)
│   ├── config/db.js            # MongoDB Atlas connection & fallback handler
│   ├── models/                 # Mongoose schemas: Skill, Project, Profile, Message
│   ├── routes/                 # REST endpoints: /api/skills, /api/projects, /api/contact, /api/health
│   └── seed/seedData.js        # Automated database seeder with complete PDF profile data
├── Dockerfile                  # Multi-stage production container build
├── docker-compose.yml          # Containerized app + MongoDB service
├── render.yaml                 # Render Blueprint specification
├── vercel.json                 # Vercel serverless deployment config
└── package.json                # Root package with unified build and dev scripts
```

---

## 🛠️ REST API Specification

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check returning uptime, node version, and database state |
| `GET` | `/api/profile` | Developer profile info, CS coursework, DSA topics, and stats |
| `GET` | `/api/skills` | Categorized skills with query filters (`?category=...&level=...&search=...`) |
| `GET` | `/api/skills/categories` | Summary counts of skills by domain |
| `GET` | `/api/projects` | All featured projects with architecture details and tech tags |
| `GET` | `/api/projects/:slug` | Deep technical specifications for a single project |
| `POST` | `/api/contact` | Submits hire/contact message and saves to database |

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
- Node.js (v18 or higher recommended, tested on v20.18.0)
- npm (v9 or higher)

### 1. Install All Dependencies
Run from the root directory:
```bash
npm run install:all
```

### 2. Build the Production Bundle
```bash
npm run build
```

### 3. Start the Unified Server
```bash
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser!

### 4. Concurrent Development Mode
To run both the Vite development server and Express API simultaneously with hot-reloading:
```bash
npm run dev
```
- Client runs on: `http://localhost:3000` (proxies `/api` to port 5000)
- Server runs on: `http://localhost:5000`

---

## ☁️ Deployment Instructions

### Option 1: Deploy on Render (Recommended — Free Tier)
1. Push your repository to **GitHub**.
2. Log into [Render.com](https://render.com) and click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. *(Optional)* In **Environment Variables**, add:
   - `MONGODB_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio`
6. Click **Deploy Web Service**! Render will automatically run the build and deploy.

### Option 2: Deploy with Docker & Docker Compose
To launch the entire stack (Node.js app + MongoDB container) locally or on any VPS (DigitalOcean, AWS EC2, Linode):
```bash
docker-compose up -d --build
```
Access the application at `http://localhost:5000`.

### Option 3: Deploy on Railway / Fly.io
1. Connect repository to **Railway**.
2. Railway detects the `package.json` build and start scripts automatically.
3. Add `MONGODB_URI` environment variable if using MongoDB Atlas.
4. Deploy!

---

## 🗄️ Connecting to MongoDB Atlas (Optional)
If you want to persist contact messages and edit skills dynamically:
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Go to **Database Access** and create a user.
3. Go to **Network Access** and whitelist `0.0.0.0/0` (allow access from anywhere).
4. Get your connection string: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio_db?retryWrites=true&w=majority`
5. Paste it in your `.env` file or cloud hosting provider environment variables as `MONGODB_URI`.
6. Run the seeder to populate the cluster:
   ```bash
   npm run seed
   ```

---

## 📜 License
Developed for professional presentation and technical portfolio demonstration.
Built with 💙 using the **MERN Stack**.
# Portfolio_Website
# Portfolio_Website
# Portfolio_Website
# Portfolio_Website
