const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory job storage (replace with MongoDB later)
let jobs = [];
let jobIdCounter = 1;

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/jobs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'jobs.html'));
});

// API Routes
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
  const { title, description, location } = req.body;
  
  if (!title || !description || !location) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const job = {
    id: jobIdCounter++,
    title,
    description,
    location,
    postedAt: new Date(),
    status: 'open'
  };

  jobs.push(job);
  res.status(201).json(job);
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

app.delete('/api/jobs/:id', (req, res) => {
  jobs = jobs.filter(j => j.id !== parseInt(req.params.id));
  res.json({ message: 'Job deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});