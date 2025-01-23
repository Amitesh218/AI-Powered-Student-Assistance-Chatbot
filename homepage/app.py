from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS  # Import CORS to handle cross-origin requests

genai.configure(api_key="AIzaSyBKDjmVVln_MYuo7Nt2Of95zH-HRFOFFNA")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"reply": "No input provided"}), 400

    try:
        model = genai.GenerativeModel("gemini-2.0-flash-exp")
        response = model.generate_content(user_input)
        return jsonify({"reply": response.text})
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)  # Ensure this runs on all IPs

