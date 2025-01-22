const chatButton = document.getElementById('chat-button');
const chatbox = document.getElementById('chatbox');
const sendButton = document.getElementById('send-button');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');

// Display the chatbot window when the button is clicked
chatButton.addEventListener('click', () => {
  chatbox.style.display = 'block';
});

// Fetch OpenAI GPT response
async function fetchChatbotResponse(userMessage) {
  const apiKey = "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"; // Replace with your regenerated API key
  const apiUrl = "https://api.openai.com/v1/completions";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003", // Or another model like gpt-3.5-turbo
      prompt: userMessage,
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

// Handle user input and display messages
sendButton.addEventListener('click', async () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Display the user's message
  const userMessageElement = document.createElement('div');
  userMessageElement.textContent = `You: ${userMessage}`;
  chatLog.appendChild(userMessageElement);

  // Clear input field
  chatInput.value = '';

  // Fetch and display chatbot response
  const botResponse = await fetchChatbotResponse(userMessage);
  const botMessageElement = document.createElement('div');
  botMessageElement.textContent = `Bot: ${botResponse}`;
  chatLog.appendChild(botMessageElement);

  // Scroll to the bottom
  chatLog.scrollTop = chatLog.scrollHeight;
});

