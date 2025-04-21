const express = require('express');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 const apiRoutes = require('./routes/api');
 const Queue = require('bull');
 const path = require('path');
 const app = express();
 const PORT = 3000;
 // Middleware
 app.use(cors());
 app.use(bodyParser.json());
 app.use(express.static(path.join(__dirname, 'public')));
 // Task queue for simulating engagement tasks
 const taskQueue = new Queue('engagement-tasks', {
 redis: { host: '127.0.0.1', port: 6379 } // Requires Redis installed locally
 });
 // Routes
 app.use('/api', apiRoutes);
 // Serve frontend pages
 app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
 app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
 app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 
'dashboard.html')));
 app.get('/admin-dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin
dashboard.html')));
 app.get('/payment', (req, res) => res.sendFile(path.join(__dirname, 'public', 'payment.html')));
 // Start server
 app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
 });
 // Export task queue for worker
module.exports = { taskQueue };