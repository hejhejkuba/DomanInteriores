import React from "react";
import {Language, useI18n} from "../i18";

const LanguageSwitcher: React.FC = () => {
    const {lang, setLang, t} = useI18n();

    return (
        <div className="language-switcher" style={{display: "flex", alignItems: "center", gap: 8}}>
            <label htmlFor="lang" style={{fontSize: 14}}>{t("changeLanguage")}:</label>
            <select
                id="lang"
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="border rounded px-2 py-1"
            >
                <option value="pl">PL</option>
                <option value="en">EN</option>
                <option value="es">ES</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
