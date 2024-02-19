const express = require('express');
const axios = require('axios');

const router = express.Router();

let requestCount = 0;

router.get('/ai', async (req, res) => {
  try {
    const content = req.query.content;
    const apiUrl = `https://api.easy-api.online/v1/globalgpt?q=${content}`;
    const response = await axios.get(apiUrl);

    requestCount++;

    const responseData = response.data;

    const jsonResponse = {
      content: responseData.content,
    };
    const logEntry = {
      timestamp: new Date(),
      requestCount: requestCount,
      requestDetails: {
        content: content,
        apiUrl: apiUrl,
      },
      response: jsonResponse,
    };

    console.log(JSON.stringify(logEntry, null, 2));

    res.json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
