// import OpenAI from 'openai';
// import { OPENAI_API_KEY } from './constans';

// const client = new OpenAI({
//   apiKey: process.env[OPENAI_API_KEY], // This is the default and can be omitted
// });

// async function main() {
//   const chatCompletion = await client.chat.completions.create({
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     model: 'gpt-4o',
//   });
// }

// main();

import OpenAI from 'openai';
import { OPENAI_API_KEY } from './constans';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // Access the API key securely
  dangerouslyAllowBrowser: true,
});

export default openai;
