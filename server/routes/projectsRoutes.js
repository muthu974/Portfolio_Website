import express from 'express';
import Project from '../models/Project.js';
import { defaultProjectsData } from '../seed/seedData.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// GET /api/projects - Retrieve all projects
router.get('/', async (req, res) => {
  const { category, featured } = req.query;

  try {
    const dbStatus = getDBStatus();
    let projects = [];

    if (dbStatus.connected) {
      const filter = {};
      if (category && category !== 'all') filter.category = category;
      if (featured === 'true') filter.featured = true;
      projects = await Project.find(filter).sort({ featured: -1, createdAt: -1 });
    } else {
      projects = defaultProjectsData.filter((p) => {
        if (category && category !== 'all' && p.category !== category) return false;
        if (featured === 'true' && !p.featured) return false;
        return true;
      });
    }

    res.json({
      success: true,
      count: projects.length,
      mode: dbStatus.connected ? 'database' : 'in-memory-fallback',
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: defaultProjectsData });
  }
});

// GET /api/projects/:slug - Retrieve single project details
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const dbStatus = getDBStatus();
    let project = null;

    if (dbStatus.connected) {
      project = await Project.findOne({ slug });
    } else {
      project = defaultProjectsData.find((p) => p.slug === slug);
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
