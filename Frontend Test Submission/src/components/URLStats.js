import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Stack,
} from '@mui/material';
import config from '../config';

function URLStats() {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${config.baseURL}/shorturls/${shortcode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          clientid: config.clientID,
          clientsecret: config.clientSecret,
        },
      });

      if (!res.ok) {
        throw new Error('Short URL not found or expired');
      }

      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      alert('Failed to fetch stats. Check console.');
      setStats(null);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        📊 Get Stats for Short URL
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label="Shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />
        <Button variant="contained" onClick={fetchStats}>
          Get Stats
        </Button>
      </Stack>

      {stats && (
        <Box mt={3}>
          <Typography variant="subtitle1">Original URL: {stats.originalUrl}</Typography>
          <Typography variant="subtitle1">Clicks: {stats.clicks.length}</Typography>
          <Typography variant="subtitle1">Created At: {new Date(stats.createdAt).toLocaleString()}</Typography>
          <Typography variant="subtitle1">Expires At: {new Date(stats.expiresAt).toLocaleString()}</Typography>

          <Typography variant="h6" mt={2}>Click Details:</Typography>
          {Array.isArray(stats.clicks) && stats.clicks.map((click, idx) => (
            <Paper key={idx} sx={{ my: 1, p: 1 }}>
              <Typography>Time: {new Date(click.timestamp).toLocaleString()}</Typography>
              <Typography>Referrer: {click.referrer || 'N/A'}</Typography>
              <Typography>Location: {click.geo || 'Unknown'}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  );
}

export default URLStats;
