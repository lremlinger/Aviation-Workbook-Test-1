AVIATION AI ASSISTANT ADD-ON

FILES INCLUDED:
1. ai-assistant-ui.html
   - Copy/paste this into your existing index.html.

2. ai-assistant.css
   - Upload this beside your index.html.
   - Add this inside your <head> if not already included:
     <link rel="stylesheet" href="ai-assistant.css" />

3. ai-assistant.js
   - Upload this beside your index.html.
   - Add this before </body>:
     <script src="ai-assistant.js"></script>

4. netlify/functions/ai-assistant.js
   - Keep this exact folder path.
   - Upload the whole netlify folder to GitHub with your website.

5. example-index.html
   - Example complete website page with the AI Assistant already connected.

NETLIFY API KEY SETUP:
1. Go to Netlify.
2. Open your site.
3. Go to Site configuration or Site settings.
4. Go to Environment variables.
5. Add variable:
   OPENAI_API_KEY
6. Paste your OpenAI API key as the value.
7. Save.
8. Redeploy your site.

IMPORTANT:
Do not put your OpenAI API key inside index.html.
The key only belongs inside Netlify environment variables.
