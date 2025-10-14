import fs from "fs";
import path from "path";
import { parse as parseJsonc } from "jsonc-parser";
import { translate } from "./providers/gemini";
export default function localizationAI(options) {
    const { source, targets, extraPromt, outputDir = path.dirname(source), apiKey = process.env.LOCALIZATION_AI_API_KEY, } = options;
    return {
        name: "vite-plugin-localization-ai",
        apply: "build",
        buildStart: async () => {
            console.log("[localization-ai] starting localization...");
            const sourceContent = parseJsonc(fs.readFileSync(source, "utf-8"));
            for (const lang of targets) {
                console.log(`[localization-ai] Translating to ${lang}...`);
                const translated = await translate(sourceContent, lang, apiKey);
                const outputPath = path.join(outputDir, `${lang}.json`);
                fs.writeFileSync(outputPath, JSON.stringify(translated, null, 2), "utf-8");
                console.log(`[localization-ai] ${lang}.json saved!`);
            }
            console.log("[localization-ai] done ✅");
        },
    };
}
