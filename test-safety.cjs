const fetch = require('node-fetch');

async function test() {
  const apiKey = 'AIzaSyDj-nET3PWgcALILv9fWBhXZv49kh6hXMQ';
  const model = 'gemini-2.5-flash';
  const prompt = "link me to a consultant";

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ]
  };

  console.log(`Testing model=${model} with safetySettings...`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  );

  const data = await response.json();
  console.log(`Status: ${response.status}`);
  console.log(JSON.stringify(data, null, 2));
}

test();
