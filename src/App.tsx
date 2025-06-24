import React, {useEffect, useRef, useState} from "react";

import "./styles/contact.css";
import "./styles/gallery2.css";
import "./styles/index.css";
import "./styles/logo.css";
import "./styles/menu.css";
import "./styles/services.css";
import "./styles/social-media.css";
import "./styles/styles.css";
import "./styles/welcome.css";

import "./styles/about-me.css";
import "./styles/why-us.css";
import "./styles/about.css";

import logo from "./assets/logo/7.png"
import mojaHistoria from "./assets/img/01.jpg"
import oNas from "./assets/img/02.webp"

import fb_icon from "./assets/Icons/facebook.png"
import instagram_icon from "./assets/Icons/instagram.png"


import plan from "./assets/Icons/plan.png";
import housePlan from "./assets/Icons/house-plan.png";
import talk from "./assets/Icons/talk.png";
import renovation from "./assets/Icons/renovation.png";
import outsourcing from "./assets/Icons/outsorcing.png";
import {t} from "./utils/t.ts";
import ImageGrid from "./components/ImageGrid.tsx";
import ContactSection from "./components/ContactSection.tsx";

const scrollToElement = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const scrollToElement = (selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false); // zamknij menu
    };
    return (
        <header>
            <nav className="navbar">
                <img src={logo} alt="logo"/>
                {/* Mobile Hamburger Button */}
                <button className="hamburger" onClick={toggleMenu}>
                    <span className="material-icons">
                        {isOpen ? "close" : "menu"}
                    </span>
                </button>
                <div className="contact">
                    <h3>
                        <a href="mailto:doman.interiores@gmail.com">doman.interiores@gmail.com</a>
                        <a href="tel:+34602697516">+34 602 69 75 16</a>
                    </h3>
                </div>

                {/* Desktop Menu + Kontakt */}
                <div style={{display: "flex", alignItems: "center", gap: "2rem"}}>
                    <div className="menu">
                        <a onClick={() => scrollToElement(".about-me")}>O nas</a>
                        <a onClick={() => scrollToElement(".container-holder")}>Projekty</a>
                        <a onClick={() => scrollToElement(".slide-container")}>Usługi</a>
                        <a onClick={() => scrollToElement(".email-form")}>Kontakt</a>
                    </div>


                </div>



                {/* Mobile Menu */}
                <div className={`mobile-menu ${isOpen ? "is-open" : ""}`}>
                    <a onClick={() => scrollToElement(".about-me")}>O nas</a>
                    <a onClick={() => scrollToElement(".container-holder")}>Projekty</a>
                    <a onClick={() => scrollToElement(".slide-container")}>Usługi</a>
                    <a onClick={() => scrollToElement(".email-form")}>Kontakt</a>
                </div>
            </nav>
        </header>
    );
};

const WelcomeSection: React.FC = () => {
    return (
        <div className="welcome-section">
            <div className="overlay"></div>
            <div className="welcome-content">
                <h2 className="subtitle">DOMAN INTERIORES</h2>
                <h1 className="main-title">{'“Tu casa, nuestra pasión.”'}</h1>
                <button className="cta-button" onClick={() => scrollToElement(".about-me")}>DOWIEDZ SIĘ WIĘCEJ</button>
            </div>
        </div>
    );
};
const Gallery: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageListRef = useRef<HTMLUListElement>(null);
    const prevButtonRef = useRef<HTMLButtonElement>(null);
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    const scrollbarThumbRef = useRef<HTMLDivElement>(null);
    const sliderScrollbarRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);


    useEffect(() => {
        const initSlider = () => {
            const imageList = imageListRef.current;
            const prevButton = prevButtonRef.current;
            const nextButton = nextButtonRef.current;
            const scrollbarThumb = scrollbarThumbRef.current;
            const sliderScrollbar = sliderScrollbarRef.current;

            if (!imageList || !prevButton || !nextButton || !scrollbarThumb || !sliderScrollbar) return;

            const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

            // Handle scrollbar thumb drag
            scrollbarThumb.addEventListener("mousedown", (e) => {
                const startX = e.clientX;
                const thumbPosition = scrollbarThumb.offsetLeft;
                const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

                const handleMouseMove = (e: MouseEvent) => {
                    const deltaX = e.clientX - startX;
                    const newThumbPosition = thumbPosition + deltaX;
                    const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
                    const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

                    scrollbarThumb.style.left = `${boundedPosition}px`;
                    imageList.scrollLeft = scrollPosition;
                };

                const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                };

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
            });

            // Slide images with buttons
            const handleSlide = (direction: number) => {
                const scrollAmount = imageList.clientWidth * direction;
                imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            };

            prevButton.addEventListener("click", () => handleSlide(-1));
            nextButton.addEventListener("click", () => handleSlide(1));

            // Update button visibility
            const handleSlideButtons = () => {
                prevButton.style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
                nextButton.style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
            };

            // Update scrollbar thumb position
            const updateScrollThumbPosition = () => {
                const scrollPosition = imageList.scrollLeft;
                const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
                scrollbarThumb.style.left = `${thumbPosition}px`;
            };

            imageList.addEventListener("scroll", () => {
                updateScrollThumbPosition();
                handleSlideButtons();
            });

            handleSlideButtons();
        };

        initSlider();
        window.addEventListener("resize", initSlider);

        return () => {
            window.removeEventListener("resize", initSlider);
        };
    }, []);
    return (
        <>
            <h1 className="gallery-h1">Wizualizacje</h1>
            <div className="container-holder">

                <div className="container" ref={containerRef}>
                    <div className="slider-wrapper">
                        <button id="prev-slide" ref={prevButtonRef} className="slide-button material-symbols-rounded">
                            chevron_left
                        </button>
                        <ul className="image-list" ref={imageListRef}>
                            {Array.from({length: 15}).map((_, index) => (
                                <li key={index}>
                                    <img
                                        className="image-item"
                                        src={`/${index + 1}.jpg`}
                                        alt={`img-${index + 1}`}
                                        draggable="false"
                                        onClick={() => setSelectedImage(`/${index + 1}.jpg`)}
                                    />
                                </li>
                            ))}
                        </ul>
                        <button id="next-slide" ref={nextButtonRef} className="slide-button material-symbols-rounded">
                            chevron_right
                        </button>
                    </div>
                    <div className="slider-scrollbar" ref={sliderScrollbarRef}>
                        <div className="scrollbar-track">
                            <div className="scrollbar-thumb" ref={scrollbarThumbRef}></div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedImage && (
                <div className="fullscreen-overlay" onClick={() => setSelectedImage(null)}>
                    <button
                        className="close-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        ✕
                    </button>
                    <img src={selectedImage} alt="Fullscreen" className="fullscreen-image"/>
                </div>
            )}
        </>
    );
};
const AboutMe: React.FC = () => {
    return (
        <div className="about-me">
            <div className="about-me-text">
                <h1>O mnie</h1>
                <p>{t("aboutMe1")}</p>
                <br/>
                <p>{t("aboutMe2")}</p>
                <br/>
                <p>{t("aboutMe3")}</p>
            </div>
            <div className="about-me-photo-wrapper">
                <div className="photo-background"></div>
                <div className="photo-front">
                    <img src={mojaHistoria} alt="Autor"/>
                </div>
            </div>
        </div>
    );
};

const AboutUs: React.FC = () => {
    return (
        <div className="about-wrapper">
            <div className="about">
                <div className="left">
                    <h1>O nas</h1>
                    <p>{t("aboutUs1")}</p>
                    <br/>
                    <p>{t("aboutUs2")}</p>
                    <br/>
                    <p>{t("aboutUs3")}</p>
                </div>
                <div className="right">
                    <img src={oNas} alt="Gallery"/>
                </div>
            </div>
        </div>
    );
};

const WhyUs: React.FC = () => {
    return (
        <div className="why-us-container">
            <div className="why-us">
                <div className="why-us-header">
                    <h1>Dlaczego My?</h1>
                </div>
                <div className="card-wrapper-why-us">
                    <div className="card-why-us">
                        <div className="card-content">
                            <p className="name-why-us">{t("whyUsExperienceHeader")}</p>
                            <p className="description-why-us">{t("whyUsExperienceText")}</p>
                        </div>
                    </div>
                    <div className="card-why-us">
                        <div className="card-content">

                            <p className="name-why-us">{t("whyUsTimeHeader")}</p>
                            <p className="description-why-us">{t("whyUsTimeText")}</p>
                        </div>
                    </div>
                    <div className="card-why-us">
                        <div className="card-content">
                            <p className="name-why-us">{t("whyUsMoneyHeader")}</p>
                            <p className="description-why-us">{t("whyUsMoneyText")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const SocialMedia: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <h2>Doman Interiores</h2>
                    <p>Zmiana przestrzeni z pasją ✨</p>
                </div>

                <div className="footer-contact">
                    <p>Email: <a href="mailto:doman.interiores@gmail.com">doman.interiores@gmail.com</a></p>
                    <p>Tel: <a href="tel:+34602697516">+34 602 69 75 16</a></p>
                </div>

                <div className="footer-socials">
                    <a href="https://www.facebook.com/DomanInteriores" target="_blank" rel="noopener noreferrer">
                        <img src={fb_icon} alt="Facebook" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagram_icon} alt="Instagram" />
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Doman Interiores. Wszelkie prawa zastrzeżone.</p>
            </div>
        </footer>
    );
};
const Services: React.FC = () => {
    const services = [
        {img: plan, title: t("projectServiceHeader"), description: t("projectServiceText")},
        {img: housePlan, title: t("projectServiceHeader2"), description: t("projectServiceText2") },
        { img: talk, title: t("projectServiceHeader3"), description: t("projectServiceText3") },
        { img: renovation, title: t("projectServiceHeader4"), description: t("projectServiceText4") },
        { img: outsourcing, title: t("projectServiceHeader5"), description: t("projectServiceText5") },
    ];

    return (
        <div className="slide-container">
            <h1>Usługi</h1>
            <div className="slide-content">
                <div className="card-wrapper">
                    {services.map((service, index) => (
                        <div className="card" key={index}>
                            <div className="image-content">
                                <span className="overlay"></span>
                                <div className="card-image">
                                    <img src={service.img} className="card-img" alt={service.title} />
                                </div>
                            </div>
                            <div className="card-content">
                                <h2 className="name">{service.title}</h2>
                                <p className="description">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
const HomePage: React.FC = () => {
    return (
    <div>
        <Navbar/>
        <WelcomeSection/>
        <AboutMe/>
        <AboutUs/>
        <Services/>
        <Gallery/>
        <ImageGrid />
        <WhyUs/>
        <ContactSection/>
        <SocialMedia/>
    </div>)
};

export default HomePage;
