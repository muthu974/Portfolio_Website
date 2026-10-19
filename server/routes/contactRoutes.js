import express from 'express';
import Message from '../models/Message.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// In-memory messages backup when DB is not connected
const inMemoryMessages = [];

// POST /api/contact - Submit a contact / hire inquiry
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields (name, email, and message).',
    });
  }

  // Basic email pattern check
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  try {
    const dbStatus = getDBStatus();
    const newMsg = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject || 'General Inquiry / Collaboration').trim(),
      message: message.trim(),
      createdAt: new Date(),
    };

    if (dbStatus.connected) {
      await Message.create(newMsg);
    } else {
      inMemoryMessages.unshift(newMsg);
      console.log(`📩 [Contact Form Received (Fallback Memory)]: From ${name} <${email}>: "${subject}"`);
    }

    res.status(201).json({
      success: true,
      message: `Thank you, ${name}! Your message has been received. I will get back to you shortly at ${email}.`,
      data: {
        name: newMsg.name,
        subject: newMsg.subject,
        createdAt: newMsg.createdAt,
      },
    });
  } catch (error) {
    console.error('Contact route error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process your message. Please try again later or reach out directly via email.',
    });
  }
});

// GET /api/contact/messages - Internal/Admin check
router.get('/messages', async (req, res) => {
  try {
    const dbStatus = getDBStatus();
    let messages = [];

    if (dbStatus.connected) {
      messages = await Message.find().sort({ createdAt: -1 }).limit(20);
    } else {
      messages = inMemoryMessages;
    }

    res.json({
      success: true,
      count: messages.length,
      mode: dbStatus.connected ? 'database' : 'in-memory-fallback',
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
