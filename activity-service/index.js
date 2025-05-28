const express = require('express')
const axios = require('axios')

const app = express()

const PORT = process.env.PORT || 3002

app.get('/activity', async (req, res) => {
    const {weathercode} = req.query

    try {
        const type = weathercode < 3 ? 'recreational': 'relaxation'
        const response = await axios.get(`https://www.boredapi.com/api/activity?type=${type}`)
        res.json(response.data)
    } catch (error) {
        console.error('ERROR:', error.message);
        res.status(500).json({error: 'Error obteniendo servicio'})
    }
})

app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`)
})