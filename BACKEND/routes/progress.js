const express = require('express');
const router = express.Router();
const Progress = require('../models/progress');

// GET progress by user email
router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const progress = await Progress.find({ email });
    res.status(200).json(progress);
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

module.exports = router;
