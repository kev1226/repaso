const express = require('express')
const axios = require('axios')

const app = express()
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3004

app.get('/chiste', async (req, res) => { 
    try {
        const responde = await axios.get(`https://api.chucknorris.io/jokes/random`)
        res.json(responde.data)
    } catch (error) {
        res.status(500).json({error: 'Error al contar chiste'})
    }
})

app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`)
})