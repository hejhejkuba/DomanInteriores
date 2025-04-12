import pl from "./pl.ts";

const translations = pl; // Możesz później rozszerzyć na inne języki

export function t(key: keyof typeof translations): string {
    return translations[key] || key;
}
