import { GoogleGenAI } from "@google/genai";

export async function translate(
  sourceJson: Record<string, any>,
  targetLocale: string,
  targetPromt: string,
  apiKey?: string,
  extraPromt?: string,
  temperature?: number,
  seed?: number
) {
  const client = new GoogleGenAI({
    apiKey: apiKey,
  });

  const text = JSON.stringify(sourceJson, null, 2);

  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    temperature: temperature,
    seed: seed,
    responseMimeType: "application/json",
    systemInstruction: [
      {
        text: `Translate according to locale codes (ISO 639/3166). Use language code and region code from locale! Translate JSON values exactly, keep keys and structure. The response must be plain text — no Markdown`,
      },
    ],
  };
  const model = "gemini-2.5-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `You are a professional application interface translator.
Translate the JSON into ${targetPromt} (ISO locale: ${targetLocale}).
JSON:
${text}

${extraPromt || ""}
`,
        },
      ],
    },
  ];

  const response = await client.models.generateContent({
    contents: contents,
    model: model,
    config: config,
  });

  const translatedText = response.text?.trim() || "{}";
  return JSON.parse(translatedText || "{}");
}
