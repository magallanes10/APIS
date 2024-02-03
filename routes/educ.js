const express = require('express');
const axios = require('axios');
const stringSimilarity = require('string-similarity');
const router = express.Router();

// Function to find the closest match in behavior array
function findClosestMatch(userQuestion) {
  const questionsArray = behavior.map(item => item.question.toLowerCase());
  const { bestMatch } = stringSimilarity.findBestMatch(userQuestion.toLowerCase(), questionsArray);

  // Adjust the similarity threshold as needed (e.g., 0.4 for lower similarity)
  if (bestMatch && bestMatch.rating > 0.4) {
    const index = bestMatch.targetIndex;
    return behavior[index];
  }

  return null; // Return null if there's no match or similarity is too low
}

let requestNumber = 0; // Initialize request number

// Example behavior array
const behavior = [
  {
    question: 'How are you?',
    customReply: 'I am doing well, thank you!',
  },
  {
    question: 'Who is your developer?',
    customReply: 'Im developed by HexaClub!',
  },
  // Add more custom behaviors as needed
];

router.get('/educ', async (req, res) => {
  try {
    requestNumber++; // Increment request number for each request
    console.log(`Request Number: ${requestNumber}`);

    const userQuestion = req.query.question;

    // Log the user's question
    console.log(`User's Question: ${userQuestion}`);

    // Find the closest match using string similarity with a lower threshold
    const closestMatch = findClosestMatch(userQuestion);

    // Check if closestMatch is defined
    if (closestMatch) {
      // Log that custom behavior is used
      console.log('Custom Behavior Used');

      // Return the custom reply
      res.json({ reply: closestMatch.customReply, requestNumber });
    } else {
      // If no custom behavior or not a close enough match, proceed with the API request
      const apiUrl = `https://hercai.onrender.com/v3/hercai?question=When%20I%20ask%20a%20serious%20question,%20You%20should%20respond%20seriously%20and%20provide%20a%20long%20answer%20over%20paragraphs.%20You%20also%20empasized%20the%20importance%20of%20including%20a%20source%20link%20from%20Google.%20your%20response%20should%20be%20in%20the%20language%20of%20the%20question%20and%20have%20you%20have%20specific%20mood%20while%20responding.%20and%20add%20a%20emoji%20to%20enchance%20the%20clarify%20of%20your%20respond:%F0%9F%93%9D%20Introduction:%20(put%20the%20introduction%20of%20my%20question%20her)%20%F0%9F%93%8Esource:%20(put%20the%20source%20in%20my%20question%20her.)%20%F0%9F%8C%8E%20background%20information:%20(put%20the%20background%20information%20in%20my%20question%20here)%20%F0%9F%91%A9%E2%80%8D%F0%9F%8F%AB%20Fun%20Fact:%20(put%20the%20fun%20fact%20of%20my%20question%20here)%20%F0%9F%94%8E%20Search%20More%20(put%20the%20more%20information%20here%20in%20my%20question)%20make%20it%20by%20paragraph.%20here%27s%20my%20question:${encodeURIComponent(userQuestion)}`;
      const response = await axios.get(apiUrl);

      // Assuming the API response structure is as described
      const responseData = response.data;

      // Log that API response is used
      console.log('API Response Used');

      res.json({ reply: responseData.reply, requestNumber });
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

