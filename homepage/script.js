document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    if (!userInput.trim()) return; // Prevent empty messages

    // Display the user's message
    const userMessage = document.createElement("div");
    userMessage.textContent = userInput;
    userMessage.className = "user-message";
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear the input field
    document.getElementById("user-input").value = "";

    // Call your backend API to get a response
    const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();

    // Display the bot's response
    const botMessage = document.createElement("div");
    botMessage.textContent = data.reply || "Error fetching response.";
    botMessage.className = "bot-message";
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
});

