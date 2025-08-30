import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./locales/en.ts";
import pl from "./locales/pl.ts";
import es from "./locales/es.ts";

export type Language = "pl" | "en" | "es";
const DICTS = { pl, en, es } as const;

type Dict = typeof en;
export type TKey = keyof Dict;

function interpolate(template: string, vars?: Record<string, string | number>) {
    if (!vars) return template;
    return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

type I18nCtx = {
    lang: Language;
    setLang: (l: Language) => void;
    t: (k: TKey, vars?: Record<string, string | number>) => string;
};

const Ctx = createContext<I18nCtx | null>(null);
const STORAGE_KEY = "app.lang";

const detectBrowserLang = (): Language => {
    const lang = (navigator?.language || "en").toLowerCase();

    if (lang.startsWith("pl")) return "pl";
    if (lang.startsWith("es")) return "es";
    return "en";
};

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [lang, setLang] = useState<Language>(() => {
        const saved = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as Language | null) : null;
        return saved ?? detectBrowserLang();
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, lang);
    }, [lang]);

    const dict = DICTS[lang];

    const t = useMemo(() => {
        return (k: TKey, vars?: Record<string, string | number>) => {
            const val = dict[k] as unknown as string | undefined;
            return interpolate(val ?? String(k), vars);
        };
    }, [dict]);

    return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
    return ctx;
};
