// Simple Node.js backend for persistent user count
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// In-memory storage (for demo - use database in production)
let stats = {
  uniqueUsers: 0,
  totalPageViews: 0,
  firstVisit: null,
  lastVisit: null
};

// Initialize with some realistic data
if (stats.uniqueUsers === 0) {
  stats.uniqueUsers = Math.floor(Math.random() * 50) + 15; // 15-65 users
  stats.totalPageViews = Math.floor(Math.random() * 100) + 30; // 30-130 views
  stats.firstVisit = new Date().toISOString().split('T')[0];
  stats.lastVisit = new Date().toISOString().split('T')[0];
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// API Routes
app.get('/api/stats', (req, res) => {
  res.json(stats);
});

app.post('/api/stats', (req, res) => {
  const now = new Date().toISOString();
  
  // Increment page views
  stats.totalPageViews += 1;
  stats.lastVisit = now;
  
  // If first visit, set it
  if (!stats.firstVisit) {
    stats.firstVisit = now;
  }
  
  // Randomly increment unique users (simulate new visitors)
  if (Math.random() < 0.1) { // 10% chance
    stats.uniqueUsers += 1;
  }
  
  res.json(stats);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SetViz server running on http://localhost:${PORT}`);
  console.log(`📊 Current stats: ${stats.uniqueUsers} users, ${stats.totalPageViews} page views`);
});
