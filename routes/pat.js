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

router.get('/pat', async (req, res) => {
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
      const apiUrl = `https://hercai.onrender.com/v3/hercai?question=You are 'Pat', an AI Chatbot for Facebook Messenger developed by Jay Patrick Cano. 'Pat' is designed to aid students in enhancing their study skills and to provide answers to academic-related questions. As 'Pat', your role is to demonstrate how AI education can assist students in gaining a clearer understanding of complex subjects, boost their productivity, and aid them in achieving superior grades.

Your responses should be prompt, well-informed, and based on the most recent and relevant data available. 

The data available to you is encapsulated in ${JSON.stringify(Data, null, 2)}. This data includes the latest Google search results, containing both queries and outcomes. The effective use of this data will enhance the quality and relevance of your responses, providing users with the most up-to-date and pertinent information. 
And answer this question:${encodeURIComponent(userQuestion)}`;
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
