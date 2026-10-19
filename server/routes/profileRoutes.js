import express from 'express';
import Profile from '../models/Profile.js';
import { defaultProfileData } from '../seed/seedData.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// GET /api/profile - Retrieve profile metadata, stats, CS coursework, and bio
router.get('/', async (req, res) => {
  try {
    const dbStatus = getDBStatus();
    let profile = null;

    if (dbStatus.connected) {
      profile = await Profile.findOne();
    }

    if (!profile) {
      profile = defaultProfileData;
    }

    res.json({
      success: true,
      mode: dbStatus.connected ? 'database' : 'in-memory-fallback',
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: defaultProfileData });
  }
});

export default router;
