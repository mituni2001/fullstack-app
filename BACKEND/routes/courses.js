const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Get courses by creator email
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const courses = await Course.find({ createdBy: email });
    res.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new course
router.post('/', async (req, res) => {
  try {
    const { title, description, createdBy, topics, chapters } = req.body;
    if (!title || !createdBy) {
      return res.status(400).json({ error: 'Title and CreatedBy are required' });
    }

    const newCourse = new Course({
      title,
      description,
      createdBy,
      topics: topics || [],
      chapters: chapters || [],
      completedChapter: [],
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update progress of chapters
router.put('/:id/progress', async (req, res) => {
  try {
    const { completedChapter } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { completedChapter },
      { new: true }
    );
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;