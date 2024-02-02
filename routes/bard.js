const express = require('express');
const { BardAPI } = require('bard-api-node');

const router = express.Router();

router.get('/bard', async (req, res) => {
  try {
    const assistant = new BardAPI();

    // Set session information for authentication
    await assistant.setSession('__Secure-1PSID', 'g.a000gAjRMutDT3hlbwNV1P2UA1Ij7DRWcRDvMYSVXLfHpafK5mzoj1T-liYFVMU-K1WJNsS_rwACgYKAV0SAQASFQHGX2MiU3I-tS9KY02QkjBodt-yxxoVAUF8yKqenqa-sUE0bjVgub1hRDPh0076'); // or '__Secure-3PSID'
    // ...

    // Extract the query from the query parameters
    const userQuery = req.query.query;

    // Send the user's query to Bard
    const response = await assistant.getBardResponse(userQuery);

    // Return Bard's response to the client
    res.json({ response: response.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
