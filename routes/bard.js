const express = require('express');
const { GeminiAPI } = require('gemini-api-node');

const router = express.Router();

router.get('/gemini', async (req, res) => {
  try {
    const assistant = new GeminiAPI();

    // Set session information for authentication
    await assistant.setSession('__Secure-1PSID', 'g.a000gAjRMlVo6GPWk5RehzPh7xRadU7qS9GlPJSVJtoL0Ihc4W4x0BRw9fz1RP2dNLVB8GwAoAACgYKAVYSAQASFQHGX2MiT0YfcREPWM49mPJvSCY2lxoVAUF8yKrRNSjsfeusW9BX1pVg7ORX0076'); // or '__Secure-3PSID'
    // ...

    // Extract the query from the query parameters
    const userQuery = req.query.query;

    // Send the user's query to Bard
    const response = await assistant.getGeminiResponse(userQuery);

    // Return Bard's response to the client
    res.json({ response: response.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
