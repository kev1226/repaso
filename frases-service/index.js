// quote-service.js
const express = require('express');
const axios = require('axios');

const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3003;

app.get('/frase', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random', {
      headers: {
        'Accept': 'application/json'
      }
    });
    res.json(response.data[0]); // Devuelve solo la primera frase
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error obteniendo frase' });
  }
});

app.listen(PORT, () => {
  console.log(`Quote service escuchando en http://localhost:${PORT}`);
});
