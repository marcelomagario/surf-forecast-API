const express = require('express');
const combineData = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/dados', async (req, res) => {
  try {
    const data = await combineData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});