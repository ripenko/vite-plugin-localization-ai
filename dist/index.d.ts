type LocalizationLocale = {
    locale: string;
    fileName: string;
    promt: string;
};
interface LocalizationAIOptions {
    source: string;
    targets: LocalizationLocale[];
    outputDir?: string;
    apiKey?: string;
    extraPromt?: string;
    temperature?: number;
    seed?: number;
}
export default function localizationAI(options: LocalizationAIOptions): {
    name: string;
    apply: string;
    buildStart: () => Promise<void>;
};
export {};
