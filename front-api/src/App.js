import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [quote, setQuote] = useState(null);
  const [joke, setJoke] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const lat = 40.7128; // Coordenadas de prueba (NYC)
    const lon = -74.0060;

    (async () => {
      try {
        // Clima
        const w = await axios.get(`http://localhost:3001/clima?lat=${lat}&lon=${lon}`);
        setWeather(w.data);

        // Frase motivacional
        const q = await axios.get(`http://localhost:3003/frase`);
        setQuote(q.data); // contiene .q y .a

        // Chiste Chuck Norris
        const j = await axios.get('http://localhost:3004/chiste');
        setJoke(j.data); // contiene .value

      } catch (e) {
        console.error(e);
        setError(true);
      }
    })();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🌤️ Planifica tu día</h1>

      {error && <p style={{ color: 'red' }}>Ocurrió un error al cargar los datos.</p>}

      {weather && (
        <div>
          <h2>Clima</h2>
          <p>🌡️ Temperatura: {weather.temperature}°C</p>
          <p>☁️ Código del clima: {weather.weathercode}</p>
        </div>
      )}

      {quote && (
        <div>
          <h2>Frase motivacional</h2>
          <blockquote>"{quote.q}"</blockquote>
          <p>— {quote.a || 'Anónimo'}</p>
        </div>
      )}

      {joke && (
        <div>
          <h2>Chiste del día</h2>
          <p>😂 {joke.value}</p>
        </div>
      )}
    </div>
  );
}
