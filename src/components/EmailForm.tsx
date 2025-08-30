import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../styles/emailFormStyles.css";
import {useI18n} from "../i18";

const EmailForm: React.FC = () => {
    const [formData, setFormData] = useState({
        from_name: "",
        reply_to: "",
        phone: "",
        message: "",
    });
    const { t } = useI18n();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResponseMessage(null);

        try {
            const serviceId = "service_g64d6h7";
            const templateId = "template_ahzmcjm";
            const userId = "WHqpHb_TKuiwztvYR";

            await emailjs.send(serviceId, templateId, formData, userId);
            setResponseMessage(t("sendEmailResponseMsg"));
            setFormData({ from_name: "", reply_to: "", phone: "", message: "" });
        } catch (error) {
            console.error("Błąd podczas wysyłania e-maila:", error);
            setResponseMessage(t("sendEmailResponseError"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="email-form">
            <h2>{t("sendEmailText")}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="from_name">{t("sendEmailName")}</label>
                    <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="reply_to">{t("sendEmailEmail")}</label>
                    <input
                        type="email"
                        id="reply_to"
                        name="reply_to"
                        value={formData.reply_to}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone">{t("sendEmailPhone")}</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="[0-9+\-\s]*"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="message">{t("sendEmailMessage")}</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t("sendEmailSending") : t("sendEmailSend")}
                </button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default EmailForm;
