document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. DOM Elements ---
    const navItems = document.querySelectorAll(".nav-links li");
    const tabContents = document.querySelectorAll(".tab-content");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const sidebarCloseBtn = document.getElementById("sidebar-close-btn");
    const autohideToggle = document.getElementById("autohide-toggle");
    const hoverZone = document.querySelector(".hover-trigger-zone");
    const appContainer = document.querySelector(".app-container");
    const contentArea = document.querySelector(".content-area");

    // --- 2. Mobile Sidebar Helper Functions ---
    function openMobileSidebar() {
        if (sidebar) sidebar.classList.add("mobile-open");
        if (sidebarOverlay) sidebarOverlay.classList.add("active");
        if (mobileMenuBtn) mobileMenuBtn.classList.add("hidden");
    }

    function closeMobileSidebar() {
        if (sidebar) sidebar.classList.remove("mobile-open");
        if (sidebarOverlay) sidebarOverlay.classList.remove("active");
        if (mobileMenuBtn) mobileMenuBtn.classList.remove("hidden");
    }

    // --- 3. Tab Switching Logic ---
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            item.classList.add("active");
            const targetId = item.getAttribute("data-tab");
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add("active");

            // Close mobile sidebar after navigation
            if (window.innerWidth <= 768) {
                closeMobileSidebar();
            }
        });
    });

    // --- 4. Theme Toggle ---
    const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;
    const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;
    const themeText = themeBtn ? themeBtn.querySelector("span") : null;

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            if (body.classList.contains("dark-mode")) {
                if (themeIcon) themeIcon.className = "fa-solid fa-moon";
                if (themeText) themeText.textContent = "Dark Mode";
            } else {
                if (themeIcon) themeIcon.className = "fa-solid fa-sun";
                if (themeText) themeText.textContent = "Light Mode";
            }
        });
    }

    // --- 5. Sidebar Auto-Hide (Desktop) ---
    if (autohideToggle && sidebar && appContainer) {
        autohideToggle.addEventListener("change", (e) => {
            if (e.target.checked) {
                sidebar.classList.add("autohide");
            } else {
                sidebar.classList.remove("autohide");
                appContainer.classList.remove("hovered");
            }
        });

        if (hoverZone) {
            hoverZone.addEventListener("mouseenter", () => {
                if (sidebar.classList.contains("autohide")) {
                    appContainer.classList.add("hovered");
                }
            });
        }

        sidebar.addEventListener("mouseleave", () => {
            appContainer.classList.remove("hovered");
        });

        if (contentArea) {
            contentArea.addEventListener("mouseenter", () => {
                if (sidebar.classList.contains("autohide")) {
                    appContainer.classList.remove("hovered");
                }
            });
        }
    }

    // --- 6. Mobile Sidebar Controls ---
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", openMobileSidebar);
    }

    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener("click", closeMobileSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeMobileSidebar);
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMobileSidebar();
        }
    });

    // --- 7. Advanced Multi-Typewriter Logic ---
    class Typewriter {
        constructor(elementId, phrases) {
            this.element = document.getElementById(elementId);
            this.phrases = phrases;
            this.phraseIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            if (this.element) this.type();
        }

        type() {
            const currentPhrase = this.phrases[this.phraseIndex];

            if (this.isDeleting) {
                this.element.textContent = currentPhrase.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.element.textContent = currentPhrase.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            let speed = this.isDeleting ? 40 : 80;

            if (!this.isDeleting && this.charIndex === currentPhrase.length) {
                speed = 2000; // Pause at end
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
                speed = 400; // Pause before new word
            }

            setTimeout(() => this.type(), speed);
        }
    }

    // Initialize the three different typewriters
    new Typewriter("home-typewriter", [
        "economic growth.",
        "quality education.",
        "infrastructure development.",
        "reducing inequalities.",
        "strong institutions."
    ]);

    new Typewriter("skills-typewriter", [
        "creative storytelling.",
        "humanitarian data analysis.",
        "community organizing.",
        "digital accessibility.",
        "personal development."
    ]);

    new Typewriter("jobs-typewriter", [
        "crazy.",
        "creative.",
        "hardworking.",
        "relentless.",
        "visionary."
    ]);

    // --- 8. NASA Kepler Facts ---
    const facts = [
        "Fun Fact: NASA's Kepler mission proved our sky is filled with more planets than stars.",
        "Fun Fact: Kepler discovered over 2,600 confirmed exoplanets using transit photometry.",
        "Fun Fact: Named after Johannes Kepler, who formulated the laws of planetary motion.",
        "Fun Fact: Kepler monitored over 150,000 stars simultaneously in the Cygnus constellation."
    ];

    const factElement = document.getElementById("kepler-fact");
    if (factElement) {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        factElement.style.opacity = 0;
        setTimeout(() => {
            factElement.textContent = randomFact;
            factElement.style.transition = "opacity 0.5s ease";
            factElement.style.opacity = 1;
        }, 200);
    }
});
