import { Configuration, OpenAIApi } from "openai";
import type { PostOffice } from './postal';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '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'
});

const openai = new OpenAIApi(configuration);

export async function generateRepresentativePrompt(areaDetails: PostOffice): Promise<string> {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that generates realistic information about Indian political representatives based on area details."
      },
      {
        role: "user",
        content: `Generate information about political representatives for the area with these details:
        State: ${areaDetails.State}
        District: ${areaDetails.District}
        Region: ${areaDetails.Region}
        Area: ${areaDetails.Name}
    
        Return ONLY a JSON object with realistic Indian names and details matching the area's demographics. Use this exact structure:
        {
          "mla": {
            "name": "Full Name (should match ${areaDetails.State} demographics)",
            "party": "Political Party common in ${areaDetails.State}",
            "phone": "+91 XXXXXXXXXX",
            "email": "email@domain",
            "constituency": "${areaDetails.District} Assembly"
          },
          "mp": {
            "name": "Full Name (should match ${areaDetails.State} demographics)",
            "party": "Political Party common in ${areaDetails.State}",
            "phone": "+91 XXXXXXXXXX",
            "email": "email@domain",
            "constituency": "${areaDetails.District} Parliamentary"
          },
          "corporators": [
            {
              "name": "Full Name (should match ${areaDetails.State} demographics)",
              "party": "Political Party common in ${areaDetails.State}",
              "phone": "+91 XXXXXXXXXX",
              "email": "email@domain",
              "ward": "${areaDetails.Name} Ward A"
            },
            {
              "name": "Full Name (should match ${areaDetails.State} demographics)",
              "party": "Political Party common in ${areaDetails.State}",
              "phone": "+91 XXXXXXXXXX",
              "email": "email@domain",
              "ward": "${areaDetails.Name} Ward B"
            }
          ]
        }`
      }
    ]
  });

  return completion.data.choices[0]?.message?.content || '';
}