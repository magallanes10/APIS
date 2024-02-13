const express = require('express');
const { ytdown } = require('nayan-media-downloader');

const router = express.Router();

router.get('/yt', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).send('Missing parameters. Please provide a "url" parameter.');
    }

    const result = await ytdown(url);
    res.json({ url: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
