interface LocalizationAIOptions {
    source: string;
    targets: string[];
    outputDir?: string;
    apiKey?: string;
    extraPromt?: string;
}
export default function localizationAI(options: LocalizationAIOptions): {
    name: string;
    apply: string;
    buildStart: () => Promise<void>;
};
export {};
