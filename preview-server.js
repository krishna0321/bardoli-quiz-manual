const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle React Router routes - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏆 Bardoli Brain Battle server running on port ${PORT}`);
  console.log(`🌐 Local access: http://localhost:${PORT}`);
  console.log(`🔗 Preview URL: https://${process.env.HOSTNAME || 'preview'}.preview.emergentagent.com`);
  console.log('✅ Website is ready for preview!');
});

module.exports = app;