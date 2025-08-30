import React from "react";
// ContactDetails.tsx
import "../styles/contact-details.css";
import {useI18n} from "../i18";
const ContactDetails: React.FC = () => {
    const  { t } = useI18n();
    return (
        <div className="contact-details">
            <h2>{t("contactText")}</h2>
            <p><strong>Doman Interiores</strong></p>
            <p>{t("socialMediaText")}</p>
            <p><strong>Email:</strong> <a href="mailto:doman.interiores@gmail.com">doman.interiores@gmail.com</a></p>
            <p><strong>Tel:</strong> <a href="tel:+34602697516">+34 602 69 75 16</a></p>
            <div className="social-media">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
        </div>
    );
};

export default ContactDetails;