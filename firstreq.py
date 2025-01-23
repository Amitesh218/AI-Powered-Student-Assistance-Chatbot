import google.generativeai as genai

genai.configure(api_key="AIzaSyBKDjmVVln_MYuo7Nt2Of95zH-HRFOFFNA")
model = genai.GenerativeModel("gemini-2.0-flash-exp")
response = model.generate_content("Explain how AI works")
print(response.text)

#ncice broo
