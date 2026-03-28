const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/api/search', async (req, res) => {
  const ingredient = req.query.q;
  const response = await fetch(`https://www.trolley.co.uk/search/?from=search&q=${ingredient}&order=price`);
  const data = await response.json();
  res.json(data);
});

app.listen(3001, () => console.log('Server running on port 3001'));