// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const floodRoutes = require('./routes/floodRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, 
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));


app.use('/api', floodRoutes);
app.use('/api', authRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'NOT_FOUND' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));