import { GoogleGenAI } from "@google/genai";
export async function translate(sourceJson, targetLang, apiKey, extraPromt) {
    const client = new GoogleGenAI({
        apiKey: apiKey,
    });
    const text = JSON.stringify(sourceJson, null, 2);
    const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a professional application interface translator.
Translate the JSON.
JSON:
${text}

Target language is "${targetLang}". ${extraPromt || ""}
`,
        config: {
            systemInstruction: "Translate JSON values exactly, keep keys and structure. The response must be plain text — no Markdown",
            temperature: 0,
            seed: 42,
            responseMimeType: "application/json",
        },
    });
    const translatedText = response.text?.trim() || "{}";
    return JSON.parse(translatedText || "{}");
}
