/* =========================================================
   NISHANK TIWARI - PORTFOLIO JAVASCRIPT
   ========================================================= */

   document.addEventListener("DOMContentLoaded", () => {

    /* ================= TYPING EFFECT ================= */

    const typingElement = document.getElementById("typing");

    const words = [
        "Software Engineer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingElement) return;

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);
                return;
            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;
                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }
            }
        }

        setTimeout(
            typeEffect,
            deleting ? 60 : 100
        );
    }

    typeEffect();


    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("show");

            const isOpen =
                navLinks.classList.contains("show");

            menuBtn.textContent =
                isOpen ? "✕" : "☰";
        });


        const navItems =
            navLinks.querySelectorAll("a");

        navItems.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("show");

                menuBtn.textContent = "☰";

            });

        });
    }


    /* ================= ACTIVE NAVBAR ================= */

    const sections =
        document.querySelectorAll("section");

    const navItems =
        document.querySelectorAll(".nav-links a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");
            }

        });


        navItems.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* ================= BACK TO TOP ================= */

    const topBtn =
        document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                topBtn.classList.add("show");

            } else {

                topBtn.classList.remove("show");

            }

        });


        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(
            ".section-title, " +
            ".about-container, " +
            ".skill-card, " +
            ".project-card, " +
            ".timeline-item, " +
            ".contact-container"
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* ================= CONTACT FORM ================= */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                /*
                 * Formspree ko manually request bhejenge.
                 * Isliye page reload nahi hoga.
                 */

                event.preventDefault();


                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                const name =
                    document.getElementById("name")
                        .value
                        .trim();

                const email =
                    document.getElementById("email")
                        .value
                        .trim();

                const message =
                    document.getElementById("message")
                        .value
                        .trim();


                /* ---------- Validation ---------- */

                if (!name || !email || !message) {

                    formMessage.textContent =
                        "⚠️ Please fill in all fields.";

                    formMessage.style.color =
                        "#ff6b6b";

                    return;
                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    formMessage.textContent =
                        "⚠️ Please enter a valid email.";

                    formMessage.style.color =
                        "#ff6b6b";

                    return;
                }


                /* ---------- Loading ---------- */

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending... ⏳";

                formMessage.textContent =
                    "Sending your message...";

                formMessage.style.color =
                    "#00d9ff";


                /* ---------- Formspree ---------- */

                try {

                    const formData =
                        new FormData(contactForm);


                    const response =
                        await fetch(
                            contactForm.action,
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    if (response.ok) {

                        formMessage.textContent =
                            "✅ Message sent successfully! Thank you.";

                        formMessage.style.color =
                            "#00d9ff";


                        contactForm.reset();


                        submitButton.textContent =
                            "Message Sent ✓";


                        /*
                         * 4 seconds ke baad button
                         * normal state mein aa jayega.
                         */

                        setTimeout(() => {

                            submitButton.disabled =
                                false;

                            submitButton.textContent =
                                "Send Message 🚀";

                        }, 4000);


                    } else {

                        const data =
                            await response.json()
                                .catch(() => null);


                        if (
                            data &&
                            data.errors
                        ) {

                            formMessage.textContent =
                                "❌ " +
                                data.errors
                                    .map(error =>
                                        error.message
                                    )
                                    .join(", ");

                        } else {

                            formMessage.textContent =
                                "❌ Something went wrong. Please try again.";

                        }

                        formMessage.style.color =
                            "#ff6b6b";

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Send Message 🚀";
                    }


                } catch (error) {

                    console.error(
                        "Form submission error:",
                        error
                    );


                    formMessage.textContent =
                        "❌ Network error. Please check your internet and try again.";

                    formMessage.style.color =
                        "#ff6b6b";


                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Send Message 🚀";
                }

            }
        );
    }


    /* ================= PROJECT 3D EFFECT ================= */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) / 25;

                const rotateY =
                    (centerX - x) / 25;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

            }
        );

    });


    /* ================= FOOTER YEAR ================= */

    const footer =
        document.querySelector(".footer-content");


    if (footer) {

        const yearText =
            footer.querySelector("p:last-child");


        if (yearText) {

            yearText.textContent =
                `© ${new Date().getFullYear()} Nishank Tiwari. All Rights Reserved.`;

        }

    }


    /* ================= CONSOLE ================= */

    console.log(
        "%c👋 Welcome to Nishank Tiwari's Portfolio!",
        "color:#00d9ff;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cBuilt with HTML, CSS & JavaScript 🚀",
        "color:#8b85ff;font-size:14px;"
    );

});