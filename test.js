import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";

async function getAIResponse(prompt) {
    try {
        const genAI = new GoogleGenerativeAI("AIzaSyBKDjmVVln_MYuo7Nt2Of95zH-HRFOFFNA");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const result = await model.generateContent(prompt);

        // Append user message and AI response to the chat container
        const chatContainer = document.getElementById("chatContainer");
        
        // Add user message
        const userMessage = document.createElement("div");
        userMessage.className = "user-message";
        userMessage.textContent = prompt;
        chatContainer.appendChild(userMessage);

        // Add AI response
        const aiResponse = document.createElement("div");
        aiResponse.className = "ai-response";
        aiResponse.innerHTML = marked.parse(result.response.text()); // Convert and render Markdown
        chatContainer.appendChild(aiResponse);

        // Scroll to the bottom of the chat
        chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (error) {
        console.error("Error generating content:", error);

        // Display error message in chat
        const chatContainer = document.getElementById("chatContainer");
        const errorMessage = document.createElement("div");
        errorMessage.className = "ai-response";
        errorMessage.textContent = "An error occurred while generating the response.";
        chatContainer.appendChild(errorMessage);
    }
}

function handleInput() {
    const userPrompt = document.getElementById("userPrompt").value.trim();
    if (userPrompt) {
        getAIResponse(userPrompt);
        document.getElementById("userPrompt").value = ""; // Clear input field after submission
    } else {
        alert("Please enter a valid question.");
    }
}

// Listen for clicks on the button
document.getElementById("submitPrompt").addEventListener("click", handleInput);

// Listen for Enter key press in the input field
document.getElementById("userPrompt").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission (if any)
        handleInput();
    }
});
