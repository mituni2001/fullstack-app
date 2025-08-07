const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  email: { type: String, required: true },
  courseTitle: { type: String, required: true },
  completedChapters: { type: Number, default: 0 },
  totalChapters: { type: Number, default: 0 },
  quizScore: { type: String, default: 'N/A' },
  flashcardsReviewed: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
