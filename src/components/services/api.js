import axios from 'axios';
import.meta.env.VITE_OPENAI_API_KEY;
console.log(import.meta.env.VITE_OPENAI_API_KEY);
export async function sendMessageToOpenAI(messageText, context) {
  // Prepare the prompt with context
  const prompt = `${messageText}
  
  Current user information:
  Country: ${context.country}
  Progress: ${context.progress}% complete
  
  Please provide relevant tax guidance based on the latest 2024 tax regulations.`;

  // API call to OpenAI
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',  // Use appropriate model
      messages: [
        {
          role: 'system',
          content: `You are a helpful tax assistant for ${context.country}. 
                   Provide accurate, concise guidance on tax filing procedures. 
                   If you identify specific tax information like income amounts, deductions, or personal details, 
                   include a JSON object in your response with that data using the format: 
                   [TAX_DATA]{"key": "value"}[/TAX_DATA]`
        },
        ...context.messages.map(msg => ({ role: msg.role, content: msg.content })),
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  return response.data.choices[0].message.content;
}