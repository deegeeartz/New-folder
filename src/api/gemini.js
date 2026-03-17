const systemPrompt = `
      You are Quonote's frontline AI assistant.
      Your role is to triage needs, suggest relevant services, and move users toward a consultation.

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

      Response Rules:
      - If the user describes a business challenge, provide a clear 3-step plan mapped to Quonote services.
      - Keep responses concise (under 150 words), practical, and easy to scan.
      - Ask 1-2 clarifying questions when user context is incomplete.
      - Be professional, encouraging, and friendly.

      Mandatory Escalation Rules:
      - For any pricing, quote, budget, proposal, contract, or package question, do NOT provide exact pricing.
      - Always redirect pricing discussions to booking a consultation.
      - For requests requiring professional insight (deep strategy, legal/financial/compliance, high-stakes architecture decisions), always redirect to booking a consultation.
      - For these escalation cases, end with a clear CTA: "Book a consultation" or "Contact the team at info@quonote.com".

      Boundaries:
      - Do not invent guarantees, partnerships, or case-study numbers.
      - If asked for unsupported/harmful content, refuse briefly and redirect to safe business-focused help.
      - If asked about hardware, mention Quonote's hardware support and authorized dealership guidance.
    `;

const MAX_PROMPT_CHARS = 6000;
const MAX_HISTORY_MESSAGES = 8;
const MAX_INPUT_CHARS = 500;

const sanitizeText = (text = "") =>
  text
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const sendMessageToAI = async (input, messageHistory = [], signal) => {
    try {
        if (!input || input.trim().length === 0) {
          throw new Error('Please enter a message');
        }

        if (input.length > MAX_INPUT_CHARS) {
          throw new Error(`Message too long (max ${MAX_INPUT_CHARS} characters)`);
        }

        const sanitizedInput = sanitizeText(input);

        // Build native Gemini multi-turn contents array
        const historyContents = (Array.isArray(messageHistory) ? messageHistory : [])
          .filter((item) => item?.role === "user" || item?.role === "assistant")
          .map((item) => ({
            role: item.role === "assistant" ? "model" : "user",
            parts: [{ text: sanitizeText(String(item.text || "")).slice(0, MAX_INPUT_CHARS) }],
          }))
          .filter((item) => item.parts[0].text.length > 0)
          .slice(-MAX_HISTORY_MESSAGES);

        // Ensure the last turn before the new message is from "user" if history is odd
        // (Gemini requires alternating user/model turns)
        const cleanHistory = [];
        for (let i = 0; i < historyContents.length; i++) {
          const prev = cleanHistory[cleanHistory.length - 1];
          if (prev && prev.role === historyContents[i].role) continue; // skip duplicate roles
          cleanHistory.push(historyContents[i]);
        }

        // Trim history if total prompt would exceed limit
        const currentTurn = { role: "user", parts: [{ text: sanitizedInput }] };
        let contents = [...cleanHistory, currentTurn];

        const estimatedSize = JSON.stringify(contents).length + systemPrompt.length;
        if (estimatedSize > MAX_PROMPT_CHARS) {
          // Drop oldest turns (pairs) until within limit
          while (
            contents.length > 1 &&
            JSON.stringify(contents).length + systemPrompt.length > MAX_PROMPT_CHARS
          ) {
            contents = contents.slice(1);
          }
        }

        if (JSON.stringify(contents).length + systemPrompt.length > MAX_PROMPT_CHARS) {
          const overage = JSON.stringify(contents).length + systemPrompt.length - MAX_PROMPT_CHARS;
          throw new Error(`Your message is a bit too long. Please shorten it by about ${overage} characters.`);
        }

        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${baseUrl}/api/gemini`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents, systemPrompt }),
          signal,
        });

        if (!response.ok) {
          throw new Error('Unable to get response. Please try again.');
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having a little trouble connecting to the digital brain right now. Please try again later!";
      } catch (error) {
        if (error.name === 'AbortError') {
          return null; // Request was cancelled — caller handles this
        }
        if (import.meta.env.DEV) {
          console.error("AI Error:", error);
        }
        throw error.message ? error : new Error("Sorry, I encountered a connection error. Please try again.");
      }
}
