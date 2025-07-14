// Main entry point for backend
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
