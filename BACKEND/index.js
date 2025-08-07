const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Your other routes
const userRoute = require('./routes/userRoute');
const generateTopicsRoute = require('./routes/generateTopics');
const generateCourse = require('./routes/generateCourse');
const coursesRoute = require('./routes/courses');

// ✅ NEW: Import progress route
const progressRoutes = require('./routes/progress');

// Route middlewares
app.use('/api/user', userRoute);
app.use('/api/generate-topics', generateTopicsRoute);
app.use('/api/generate-course', generateCourse);
app.use('/api/courses', coursesRoute);
app.use('/api/progress', progressRoutes); // ✅ add this line

// DB connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
