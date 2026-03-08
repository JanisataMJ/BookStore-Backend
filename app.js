const express = require('express');
const app = express();
const bookRoutes = require('./src/routes/bookRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const authorRoutes = require('./src/routes/authorRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const settingRoutes = require('./src/routes/settingRoutes');
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use('/api', bookRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authorRoutes);
app.use('/api', uploadRoutes);
app.use('/api', settingRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});