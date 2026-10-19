import express from 'express';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const dbStatus = getDBStatus();

  res.json({
    status: 'online',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    database: dbStatus,
    platform: {
      type: 'MERN Stack Unified Architecture',
      apisReady: true,
      staticClientServed: true,
    },
  });
});

export default router;
