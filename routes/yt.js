const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('yt', async (req, res, next) => {
  const id = req.query.id.split(/(\/|\?v=)/).pop();

  if (!id) {
    return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
  }

  const options = {
    method: 'GET',
    url: 'https://youtube-search-and-download.p.rapidapi.com/video',
    params: { id: id },
    headers: {
      'X-RapidAPI-Key': 'a1195f61acmsh6a9dad0b9230160p12c85fjsnde352bd0fbcd',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const data = response.data;

    console.log(response.data);

    return res.json({
      video: data.streamingData.formats[2].url,
      timer: data.videoDetails.lengthSeconds,
      title: data.videoDetails.title,
      bitrate: data.streamingData.formats[2].bitrate,
      music: data.streamingData.adaptiveFormats[4].url,
      musicbitrate: data.streamingData.adaptiveFormats[4].bitrate
    });
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Error fetching data from YouTube API' });
  }
});

module.exports = router;
