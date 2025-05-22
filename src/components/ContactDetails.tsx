import React from "react";
// ContactDetails.tsx
import "../styles/contact-details.css";
const ContactDetails: React.FC = () => {
    return (
        <div className="contact-details">
            <h2>Kontakt</h2>
            <p><strong>Doman Interiores</strong></p>
            <p>Zmiana przestrzeni z pasją ✨</p>
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