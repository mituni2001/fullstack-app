const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  console.log('/generate-course hit', JSON.stringify(req.body, null, 2));
  const { title, topics } = req.body;

  if (!title || !Array.isArray(topics) || topics.length === 0) {
    return res.status(400).json({ error: 'Title and topics (non-empty array) are required.' });
  }

  const prompt = `
Create a structured course titled '${title}' with the following topics:
${topics.map((t, i) => `${i + 1}. ${t}`).join('\n')}

For each topic, include:
- A module title
- 2–3 key learning points
- 1 quiz question with 4 options and correct answer

Return the output in JSON format like:
[
  {
    "module": "Module Title",
    "points": ["Point 1", "Point 2"],
    "quiz": {
      "question": "What is ...?",
      "options": ["A", "B", "C", "D"],
      "answer": "C"
    }
  }
]
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;
    console.log('AI raw content:', content);

    // ✅ Here's your question: This is where that try-catch block goes:
    try {
      const jsonStart = content.indexOf('[');
      const jsonEnd = content.lastIndexOf(']');
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('JSON start or end not found');
      }

      const jsonString = content.slice(jsonStart, jsonEnd + 1);
      const course = JSON.parse(jsonString);
      res.json({ course });
    } catch (err) {
      console.error('Failed to parse AI response:', err.message);
      res.status(500).json({ error: 'Failed to parse course data from AI' });
    }

  } catch (err) {
    console.error('Error generating course:', err.message);
    res.status(500).json({ error: 'Failed to generate course' });
  }
});

module.exports = router;