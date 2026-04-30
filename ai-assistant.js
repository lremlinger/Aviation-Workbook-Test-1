async function askAI() {
  const questionBox = document.getElementById('aiQuestion');
  const responseBox = document.getElementById('aiResponse');
  const question = questionBox.value.trim();

  if (!question) {
    responseBox.innerText = 'Please type a question first.';
    return;
  }

  responseBox.innerText = 'Copilot is thinking...';

  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        message: question,
        mode: 'General Copilot'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      responseBox.innerText = data.error || 'AI assistant error.';
      return;
    }

    responseBox.innerText = data.reply || 'No response received.';
  } catch (error) {
    responseBox.innerText = 'Error connecting to AI assistant. Make sure this is deployed on Vercel and your /api/ai.js function exists.';
  }
}
