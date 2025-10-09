// Example: Simple Node.js backend for persistent user count
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage (for demo - use database in production)
let stats = {
  uniqueUsers: 0,
  totalPageViews: 0,
  firstVisit: null,
  lastVisit: null
};

// Get current stats
app.get('/api/stats', (req, res) => {
  res.json(stats);
});

// Update stats (increment page views)
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

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
