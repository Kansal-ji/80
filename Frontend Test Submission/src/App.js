import React, { useState } from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import URLForm from './components/URLForm';
import URLStats from './components/URLStats';

function App() {
  const [results, setResults] = useState([]);

  const handleSuccess = (data) => {
    setResults((prev) => [...prev, data]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        🔗 URL Shortener Microservice
      </Typography>

      <Box mt={4}>
        <URLForm onSuccess={handleSuccess} />
      </Box>

      {results.length > 0 && (
        <Box mt={6}>
          <Typography variant="h6">Shortened URLs:</Typography>
          <ul>
            {results.map((r, i) => (
              <li key={i}>
                <a href={r.shortLink} target="_blank" rel="noreferrer">
                  {r.shortLink}
                </a>
                <span> — expires at {new Date(r.expiry).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Divider sx={{ my: 5 }} />
      <URLStats />
    </Container>
  );
}

export default App;
