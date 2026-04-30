function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });

  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.style.display = 'block';
  }
}

async function askAI() {
  const questionBox = document.getElementById('aiQuestion');
  const responseBox = document.getElementById('aiResponse');
  const question = questionBox.value.trim();

  if (!question) {
    responseBox.innerText = 'Please type a question first.';
    return;
  }

  responseBox.innerText = 'Thinking...';

  try {
    const response = await fetch('/.netlify/functions/ai-assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (!response.ok) {
      responseBox.innerText = data.answer || 'AI assistant error.';
      return;
    }

    responseBox.innerText = data.answer || 'No response received.';
  } catch (error) {
    responseBox.innerText = 'Error connecting to AI assistant. Make sure this is deployed on Netlify and your function exists.';
  }
}

function clearAI() {
  document.getElementById('aiQuestion').value = '';
  document.getElementById('aiResponse').innerText = 'Your AI response will appear here.';
}
