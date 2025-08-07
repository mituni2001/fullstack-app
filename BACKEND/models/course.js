const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  topic: String,
  explain: String,
  code: String,
  example: String,
});

const chapterSchema = new mongoose.Schema({
  chapterName: String,
  content: [contentSchema],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: String,
  topics: [String], // array of topic strings
  chapters: [chapterSchema], // array of chapters, each with content array
  completedChapter: [Number], // array of indexes of completed chapters
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
