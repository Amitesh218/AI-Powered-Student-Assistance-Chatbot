import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";

async function getAIResponse(prompt) {
    try {
        const genAI = new GoogleGenerativeAI("AIzaSyBKDjmVVln_MYuo7Nt2Of95zH-HRFOFFNA");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const result = await model.generateContent(prompt);

        // Use Marked.js to convert Markdown to HTML
        const responseElement = document.getElementById("resp1");
        const markdownText = result.response.text(); // AI response in Markdown format
        responseElement.innerHTML = marked.parse(markdownText); // Use `marked.parse()` for conversion
    } catch (error) {
        console.error("Error generating content:", error);

        // Handle error on the webpage
        const responseElement = document.getElementById("resp1");
        responseElement.textContent = "An error occurred while generating the response.";
    }
}

document.getElementById("submitPrompt").addEventListener("click", () => {
    const userPrompt = document.getElementById("userPrompt").value.trim();
    if (userPrompt) {
        getAIResponse(userPrompt);
    } else {
        document.getElementById("resp1").textContent = "Please enter a valid question.";
    }
});
