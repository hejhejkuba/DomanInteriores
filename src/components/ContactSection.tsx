import EmailForm from "./EmailForm";
import ContactDetails from "./ContactDetails";
import React from "react";
// ContactSection.tsx
import "../styles/contact-section.css";

const ContactSection: React.FC = () => {
    return (
        <div className="contact-section">
            <EmailForm />
            <ContactDetails />
            </div>
    );
};

export default ContactSection;