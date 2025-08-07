require('dotenv').config(); // <-- load env vars

const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required and must be a string.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates course topics.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;

    const topics = responseText
      .split(/\n|-/)
      .map(line => line.replace(/^[\d\-\.\s]+/, '').trim())
      .filter(t => t && t.length > 2);

    res.json({ topics });
  } catch (error) {
    console.error('Error generating topics:', error.message);
    res.status(500).json({ error: 'Failed to generate topics' });
  }
});

module.exports = router;