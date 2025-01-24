const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const messages = document.getElementById('messages');

// Function to add a message to the chatbox
function addMessage(sender, text) {
  const message = document.createElement('div');
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight; // Scroll to the latest message
}

// Function to call the Gemini API
async function callGeminiAPI(userMessage) {
  const apiUrl = 'https://gemini-api-url.com/chat'; // Replace with the actual API URL
  const apiKey = 'YOUR_API_KEY'; // Replace with your Gemini API key

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    return data.reply; // Adjust based on API response format
  } catch (error) {
    console.error('Error calling the Gemini API:', error);
    return 'Sorry, something went wrong.';
  }
}

// Event listener for the send button
sendButton.addEventListener('click', async () => {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage('You', userMessage);
  userInput.value = '';

  // Call the API and display the response
  const botReply = await callGeminiAPI(userMessage);
  addMessage('Bot', botReply);
});
