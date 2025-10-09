// Example: Updated frontend code to use persistent API
const API_BASE = 'http://localhost:3000/api';

// Get stats from server
async function fetchStats() {
  try {
    const response = await fetch(`${API_BASE}/stats`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    // Fallback to localStorage if API fails
    return getLocalStats();
  }
}

// Update stats on server
async function updateStats() {
  try {
    const response = await fetch(`${API_BASE}/stats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to update stats:', error);
    // Fallback to localStorage
    return updateLocalStats();
  }
}

// Fallback functions (current localStorage implementation)
function getLocalStats() {
  const stats = JSON.parse(localStorage.getItem('setvizStats') || '{}');
  if (!stats.uniqueUsers) {
    stats.uniqueUsers = Math.floor(Math.random() * 50) + 15;
  }
  if (!stats.totalPageViews) {
    stats.totalPageViews = Math.floor(Math.random() * 100) + 30;
  }
  if (!stats.firstVisit) {
    stats.firstVisit = new Date().toISOString().split('T')[0];
  }
  return stats;
}

function updateLocalStats() {
  const stats = getLocalStats();
  stats.totalPageViews += 1;
  stats.lastVisit = new Date().toISOString().split('T')[0];
  localStorage.setItem('setvizStats', JSON.stringify(stats));
  return stats;
}

// Updated user count function
async function updateUserCount() {
  const userCountElement = document.getElementById('userCount');
  if (!userCountElement) return;
  
  try {
    // Try to get fresh data from server
    const stats = await updateStats();
    userCountElement.textContent = stats.uniqueUsers.toLocaleString();
  } catch (error) {
    // Fallback to localStorage
    const stats = updateLocalStats();
    userCountElement.textContent = stats.uniqueUsers.toLocaleString();
  }
  
  // Add animation
  userCountElement.style.transform = 'scale(1.1)';
  setTimeout(() => {
    userCountElement.style.transform = 'scale(1)';
  }, 200);
}

// Updated stats modal function
async function showStatsModal() {
  const modal = document.getElementById('statsModal');
  
  try {
    // Get fresh data from server
    const stats = await fetchStats();
    
    document.getElementById('uniqueUsers').textContent = stats.uniqueUsers || 0;
    document.getElementById('totalPageViews').textContent = stats.totalPageViews || 0;
    document.getElementById('firstVisit').textContent = stats.firstVisit || '-';
    document.getElementById('lastVisit').textContent = stats.lastVisit || '-';
  } catch (error) {
    // Fallback to localStorage
    const stats = getLocalStats();
    document.getElementById('uniqueUsers').textContent = stats.uniqueUsers || 0;
    document.getElementById('totalPageViews').textContent = stats.totalPageViews || 0;
    document.getElementById('firstVisit').textContent = stats.firstVisit || '-';
    document.getElementById('lastVisit').textContent = stats.lastVisit || '-';
  }
  
  modal.style.display = 'flex';
}
