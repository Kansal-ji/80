import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
} from '@mui/material';
import config from '../config';

function URLForm({ onSuccess }) {
  const [urls, setUrls] = useState([{ url: '', shortcode: '', validity: '' }]);

  
  const handleChange = (i, field, value) => {
    const newUrls = [...urls];
    newUrls[i][field] = value;
    setUrls(newUrls);
  };

  
  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: '', shortcode: '', validity: '' }]);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let item of urls) {
      if (!item.url) continue; 

      
      const body = { url: item.url.trim() };

      if (item.shortcode && item.shortcode.trim() !== '') {
        body.shortcode = item.shortcode.trim();
      }

      if (item.validity && !isNaN(parseInt(item.validity))) {
        body.validity = parseInt(item.validity);
      }

      console.log("Sending body:", body); 

      try {
        const res = await fetch(`${config.baseURL}/shorturls`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            clientid: config.clientID,
            clientsecret: config.clientSecret,
          },
          body: JSON.stringify(body),
        });

        const data = await res.json();

        if (res.ok) {
          onSuccess(data);
        } else {
          console.error("Server error:", data);
          alert(data.message || "Something went wrong!");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Request failed. Check console.");
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        🔗 Shorten URLs (Max 5)
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {urls.map((item, i) => (
            <Box key={i} display="flex" gap={1}>
              <TextField
                fullWidth
                label="Original URL"
                value={item.url}
                onChange={(e) => handleChange(i, 'url', e.target.value)}
                required
              />
              <TextField
                label="Custom Shortcode"
                value={item.shortcode}
                onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
              />
              <TextField
                label="Validity (mins)"
                type="number"
                value={item.validity}
                onChange={(e) => handleChange(i, 'validity', e.target.value)}
              />
            </Box>
          ))}

          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              onClick={addField}
              disabled={urls.length >= 5}
            >
              + Add More
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}

export default URLForm;
