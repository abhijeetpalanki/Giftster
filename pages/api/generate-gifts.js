import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { quantity, priceMin, priceMax, gender, age, hobbies } = req.body;
  const prompt = generatePrompt(
    quantity,
    priceMin,
    priceMax,
    gender,
    age,
    hobbies
  );
  console.log(prompt);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(quantity, priceMin, priceMax, gender, age, hobbies) {
  return `suggest ${quantity} Christmas gift ideas between ${priceMin}$ and ${priceMax}$ for a ${age} years old ${gender} that is into ${hobbies}.
`;
}
