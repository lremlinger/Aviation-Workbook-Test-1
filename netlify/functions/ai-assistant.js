exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ answer: 'Method not allowed.' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const question = body.question;

    if (!question || !question.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ answer: 'Please enter a question.' })
      };
    }

    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ answer: 'Missing OPENAI_API_KEY in Netlify environment variables.' })
      };
    }

    const openAIResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: [
          {
            role: 'system',
            content: `You are a helpful aviation assistant for a pilot website. Help with aviation planning, IMSAFE, PAVE, 5P, ADM, weather thinking, checklist organization, risk management, packing, schedule preparation, and general training support. Keep answers practical, aviation-focused, and safety-minded. Never claim to replace FAA guidance, a CFI, company SOPs, aircraft POH/AFM, official weather briefings, ATC, maintenance personnel, or medical/legal professionals. For flight safety questions, encourage verification with official sources.`
          },
          {
            role: 'user',
            content: question
          }
        ]
      })
    });

    const data = await openAIResponse.json();

    if (!openAIResponse.ok) {
      return {
        statusCode: openAIResponse.status,
        body: JSON.stringify({
          answer: data.error?.message || 'OpenAI API error. Check your API key and billing.'
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: data.output_text || 'I could not generate a response.'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        answer: 'Server error. Check your Netlify function logs.'
      })
    };
  }
};
