require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('../Logging Middleware/index');
const urlRoutes = require('./routes/urlRoutes');
const cors = require('cors');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));



app.use(cors());

app.use(express.json());
app.use(logger);
app.use('/', urlRoutes);

module.exports = app;
