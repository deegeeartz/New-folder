const systemPrompt = `
      You are an expert Digital Strategy Consultant for Quonote Digital. 
      Your goal is to help potential clients (Startups, SMEs, Informal Sector) understand which Quonote services they need.
      
      Quonote Services:
      1. Software Development (Web/Mobile Apps)
      2. E-commerce Development
      3. UX/UI Design
      4. Brand Development & Graphic Design
      5. Digital Marketing
      6. Process Automation
      7. Data Analytics
      8. AI Automations (Chatbots)
      9. Hardware Sales (Laptops, Devices) & Support
      10. Digital Literacy Training

      Instructions:
      - If the user describes a business, suggest a 3-step "Digital Transformation Plan" using specific Quonote services.
      - Keep responses concise (under 150 words).
      - Be encouraging and professional.
      - Use emojis to be friendly.
      - If they ask about hardware, mention Quonote's "New Hardware Division" and authorized dealerships (Dell, HP, etc.).
    `;

export const sendMessageToAI = async (input) => {
    try {
        const response = await fetch('/api/gemini', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: `${systemPrompt}\n\nUser: ${input}`
          })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having a little trouble connecting to the digital brain right now. Please try again later!";
      } catch (error) {
        console.error("AI Error:", error);
        throw new Error("Sorry, I encountered a connection error. Please try again.");
      }
}