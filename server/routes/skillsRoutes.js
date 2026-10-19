import express from 'express';
import Skill from '../models/Skill.js';
import { defaultSkillsData } from '../seed/seedData.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// GET /api/skills - Retrieve all skills with filtering
router.get('/', async (req, res) => {
  const { category, level, search, featured } = req.query;

  try {
    const dbStatus = getDBStatus();
    let skills = [];

    if (dbStatus.connected) {
      const filter = {};
      if (category && category !== 'all') filter.category = category;
      if (level && level !== 'all') filter.level = level;
      if (featured === 'true') filter.featured = true;
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { evidence: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } },
        ];
      }
      skills = await Skill.find(filter).sort({ featured: -1, proficiencyPercentage: -1 });
    } else {
      // In-memory fallback
      skills = defaultSkillsData.filter((skill) => {
        if (category && category !== 'all' && skill.category !== category) return false;
        if (level && level !== 'all' && skill.level !== level) return false;
        if (featured === 'true' && !skill.featured) return false;
        if (search) {
          const s = search.toLowerCase();
          const matchesName = skill.name.toLowerCase().includes(s);
          const matchesEvidence = skill.evidence.toLowerCase().includes(s);
          const matchesTags = skill.tags.some((t) => t.toLowerCase().includes(s));
          if (!matchesName && !matchesEvidence && !matchesTags) return false;
        }
        return true;
      });
    }

    res.json({
      success: true,
      count: skills.length,
      mode: dbStatus.connected ? 'database' : 'in-memory-fallback',
      data: skills,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: defaultSkillsData });
  }
});

// GET /api/skills/categories - Summary of skills categorized
router.get('/categories', async (req, res) => {
  const categories = [
    { id: 'all', name: 'All Skills', icon: 'Sparkles', count: defaultSkillsData.length },
    { id: 'programming', name: 'Languages', icon: 'Code', count: defaultSkillsData.filter(s => s.category === 'programming').length },
    { id: 'web_fullstack', name: 'Web & MERN', icon: 'Globe', count: defaultSkillsData.filter(s => s.category === 'web_fullstack').length },
    { id: 'databases_cs', name: 'Databases & CS', icon: 'Database', count: defaultSkillsData.filter(s => s.category === 'databases_cs').length },
    { id: 'aiml_data', name: 'AI / ML & Data', icon: 'Brain', count: defaultSkillsData.filter(s => s.category === 'aiml_data').length },
    { id: 'tools', name: 'Tools & DevOps', icon: 'Wrench', count: defaultSkillsData.filter(s => s.category === 'tools').length },
  ];

  res.json({ success: true, data: categories });
});

export default router;
