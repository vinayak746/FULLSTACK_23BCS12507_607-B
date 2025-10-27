const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Backend Practice 1!');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'This is sample data', practice: 1 });
});

app.post('/api/data', (req, res) => {
  const { name, value } = req.body;
  res.json({ message: 'Data received', data: { name, value } });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
