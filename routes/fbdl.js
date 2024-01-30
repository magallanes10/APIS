const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const proxyHost = '111.225.152.37';
const proxyPort = '8089';

const axiosInstance = axios.create({
  proxy: {
    host: proxyHost,
    port: proxyPort,
  },
});

async function getFacebookVideo(url) {
  const response = await axiosInstance({
    method: 'POST',
    url: 'https://snapsave.app/action.php?lang=en',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: {
      url,
    },
  });

  let html;
  const evalCode = response.data.replace('return decodeURIComponent', 'html = decodeURIComponent');
  eval(evalCode);
  html = html.split('innerHTML = "')[1].split('";\n')[0].replace(/\\"/g, '"');
  const $ = cheerio.load(html);
  const downloadLinks = [];
  $('table').find('tbody').find('tr').each(function (i, elem) {
    const trElement = $(elem);
    const tds = trElement.children();
    const quality = $(tds[0]).text().trim();
    const videoUrl = $(tds[2]).children('a').attr('href');
    if (videoUrl !== undefined) {
      downloadLinks.push({
        quality,
        url: videoUrl,
      });
    }
  });

  /*
    [
      {
        quality: '720p (HD)',
        url: 'https://video-ord5-2.xx.fbcdn.net/v/t39.25447-2/xxxxxx'
      },
      {
        quality: '360p (SD)',
        url: 'https://video-ord5-2.xx.fbcdn.net/v/t42.1790-2/xxxxx'
      }
    ]
  */
  return downloadLinks;
}

const router = express.Router();

router.get('/fbdl', async (req, res) => {
  function isUrlValid(link) {
    const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return regex.test(link);
  }

  const videoUrl = req.query.videoUrl;
  if (!videoUrl) return res.jsonp({ error: 'Please provide the Facebook video URL' });
  if (!isUrlValid(videoUrl)) return res.jsonp({ error: 'Please provide a valid URL' });

  try {
    const videoData = await getFacebookVideo(videoUrl);
    if (videoData.length === 0) return res.jsonp({ error: 'No download links found for the video' });
    return res.jsonp({ data: videoData });
  } catch (error) {
    console.error(error);
    return res.jsonp({ error: 'Unable to process your request' });
  }
});

module.exports = router;
