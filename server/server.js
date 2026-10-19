import dns from 'dns';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Set Google Public DNS for reliable MongoDB Atlas SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import skillsRoutes from './routes/skillsRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

// Setup environment and paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root or server
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// REST API Routes
app.use('/api/health', healthRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);

// Production Static Serving
const clientDistPath = path.resolve(__dirname, '../client/dist');
const hasClientBuild = fs.existsSync(clientDistPath);

if (hasClientBuild) {
  console.log(`📦 Serving production React build from: ${clientDistPath}`);
  app.use(express.static(clientDistPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // Helpful development welcome screen if client isn't built yet
  app.get('/', (req, res) => {
    res.json({
      message: '🚀 MERN Portfolio API Server is running!',
      frontendDevelopmentServer: 'http://localhost:3000',
      apiEndpoints: {
        health: '/api/health',
        profile: '/api/profile',
        skills: '/api/skills',
        projects: '/api/projects',
        contact: '/api/contact (POST)',
      },
      instructions: 'In development, run "npm run dev" to start both React frontend and Express server concurrently.',
    });
  });
}

// 404 Handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

const server = app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`⚡ MERN Portfolio Server active on port: ${PORT}`);
  console.log(`🌐 Local API Base: http://localhost:${PORT}/api`);
  console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});

export default app;
