import React from "react";
import { Language, useI18n } from "../i18";
import ReactCountryFlag from "react-country-flag";

const LanguageSwitcher: React.FC = () => {
    const { lang, setLang } = useI18n();

    const flags: { code: Language; countryCode: string; label: string }[] = [
        { code: "pl", countryCode: "PL", label: "Polski" },
        { code: "en", countryCode: "GB", label: "English" },
        { code: "es", countryCode: "ES", label: "Español" },
    ];

    return (
        <div
            className="language-switcher"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
            {flags.map(({ code, countryCode, label }) => (
                <button
                    key={code}
                    onClick={() => setLang(code)}
                    style={{
                        background: "transparent",
                        border: "none",
                        outline: "none", // usuwa ramkę focus
                        cursor: "pointer",
                        padding: "5px",
                        borderRadius: "50%", // kółko
                        overflow: "hidden",
                        opacity: lang === code ? 1 : 0.5, // 🔹 tylko zmatowienie
                        transition: "opacity 0.2s ease",
                    }}
                    aria-label={label}
                    title={label}
                >
                    <ReactCountryFlag
                        countryCode={countryCode}
                        svg
                        style={{
                            width: "2.5em",
                            height: "2.5em",
                            display: "block",
                            borderRadius: "50%",
                        }}
                    />
                </button>

            ))}
        </div>
    );
};

export default LanguageSwitcher;
