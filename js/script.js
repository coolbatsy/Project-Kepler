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

    // =============================================
    // --- 9. AI SKILL-TO-GIG MAPPER ENGINE ---
    // =============================================
    const mapperForm = document.getElementById("mapper-form");
    const mapperInput = document.getElementById("mapper-input");
    const mapperLoading = document.getElementById("mapper-loading");
    const loadingStatusText = document.getElementById("loading-status-text");
    const mapperResults = document.getElementById("mapper-results");
    const mapperError = document.getElementById("mapper-error");
    const errorMessage = document.getElementById("error-message");
    const retryBtn = document.getElementById("retry-btn");
    const chipButtons = document.querySelectorAll(".chip-btn");

    // Results fields
    const resultTitle = document.getElementById("result-topic-title");
    const resultTagline = document.getElementById("result-tagline");
    const resultSummary = document.getElementById("result-summary");
    const engineBadge = document.getElementById("engine-badge");
    const sdgPillGroup = document.getElementById("sdg-pill-group");
    const insightsGrid = document.getElementById("insights-grid");
    const flowchartContainer = document.getElementById("flowchart-container");
    const flashcardsGrid = document.getElementById("flashcards-grid");
    const flipAllBtn = document.getElementById("flip-all-btn");

    // Optional API Key elements
    const apiKeyToggleBtn = document.getElementById("api-key-toggle-btn");
    const apiKeyDrawer = document.getElementById("api-key-drawer");
    const geminiKeyInput = document.getElementById("gemini-key-input");
    const saveKeyBtn = document.getElementById("save-key-btn");
    const clearKeyBtn = document.getElementById("clear-key-btn");
    const keyStatusMsg = document.getElementById("key-status-msg");
    const keyToggleLabel = document.getElementById("key-toggle-label");

    const STORAGE_KEY = "kepler_gemini_api_key";

    // Initialize saved API key
    function initApiKeyUI() {
        const savedKey = localStorage.getItem(STORAGE_KEY) || "";
        if (savedKey) {
            if (geminiKeyInput) geminiKeyInput.value = savedKey;
            if (keyStatusMsg) keyStatusMsg.textContent = "✓ Custom Gemini key active (stored securely in browser)";
            if (keyToggleLabel) keyToggleLabel.textContent = "Gemini API Key (Custom Active)";
        } else {
            if (keyToggleLabel) keyToggleLabel.textContent = "Gemini API Key (Optional)";
        }
    }
    initApiKeyUI();

    if (apiKeyToggleBtn && apiKeyDrawer) {
        apiKeyToggleBtn.addEventListener("click", () => {
            apiKeyDrawer.classList.toggle("hidden");
        });
    }

    if (saveKeyBtn && geminiKeyInput) {
        saveKeyBtn.addEventListener("click", () => {
            const val = geminiKeyInput.value.trim();
            if (val) {
                localStorage.setItem(STORAGE_KEY, val);
                if (keyStatusMsg) {
                    keyStatusMsg.textContent = "✓ Key saved! Live Gemini AI will be prioritized.";
                    keyStatusMsg.style.color = "#32d74b";
                }
                if (keyToggleLabel) keyToggleLabel.textContent = "Gemini API Key (Custom Active)";
            } else {
                localStorage.removeItem(STORAGE_KEY);
                if (keyStatusMsg) keyStatusMsg.textContent = "Key removed.";
                if (keyToggleLabel) keyToggleLabel.textContent = "Gemini API Key (Optional)";
            }
        });
    }

    if (clearKeyBtn) {
        clearKeyBtn.addEventListener("click", () => {
            localStorage.removeItem(STORAGE_KEY);
            if (geminiKeyInput) geminiKeyInput.value = "";
            if (keyStatusMsg) keyStatusMsg.textContent = "Key cleared. Using KEPLER default knowledge engine.";
            if (keyToggleLabel) keyToggleLabel.textContent = "Gemini API Key (Optional)";
        });
    }

    // Chip quick triggers
    chipButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const query = btn.getAttribute("data-query");
            if (mapperInput && query) {
                mapperInput.value = query;
                executeMapping(query);
            }
        });
    });

    if (retryBtn) {
        retryBtn.addEventListener("click", () => {
            const query = mapperInput.value.trim();
            if (query) executeMapping(query);
        });
    }

    if (mapperForm) {
        mapperForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = mapperInput.value.trim();
            if (query) {
                executeMapping(query);
            }
        });
    }

    // Client-side fallback generator in case network is offline
    function getClientFallback(topic) {
        const t = topic.trim();
        const tLower = t.toLowerCase();
        let cat = "Micro-Capability";
        let sdgs = ["SDG 4", "SDG 8"];
        let tool = "Open Source Frameworks & Git";
        let step1 = "Master foundational syntax & core concepts through 2-day micro-tutorials.";
        let step1Del = "Working proof-of-concept module.";
        let step2 = `Build a functional, localized portfolio project addressing a real community need with ${t}.`;
        let step2Del = "Deployable GitHub repository & live demo.";
        let step3 = "Pitch local micro-enterprises, non-profits, or online gig marketplaces for task-based retainers.";
        let step3Del = "First paid gig milestone: $50 - $150.";

        if (tLower.includes("python") || tLower.includes("code") || tLower.includes("script")) {
            cat = "Python Automation & Scripting";
            sdgs = ["SDG 4", "SDG 8", "SDG 9"];
            tool = "Python 3, pandas, openpyxl, GitHub";
            step1 = "Master data parsing, CSV handling, and task automation scripts.";
            step1Del = "Automated bill reconciliation script.";
            step2 = "Build a local shop inventory auditor that auto-generates daily profit/loss reports.";
            step2Del = "Full automation script with documentation.";
            step3 = "Pitch local merchants and tax consultants to automate repetitive manual paperwork.";
            step3Del = "Monthly automation retainer: $75 - $200.";
        } else if (tLower.includes("excel") || tLower.includes("sheet") || tLower.includes("data")) {
            cat = "Data Structuring & Spreadsheets";
            sdgs = ["SDG 8", "SDG 9", "SDG 10"];
            tool = "Excel, Google Sheets (XLOOKUP, Pivot Tables, Macros)";
            step1 = "Learn relational data hygiene, normalization, and conditional formulas.";
            step1Del = "Clean multi-tab ledger template.";
            step2 = "Digitize a physical paper-based retail cashbook into an automated dashboard.";
            step2Del = "Real-time Google Sheets business dashboard.";
            step3 = "Offer record digitization to community pharmacies, clinics, and local stores.";
            step3Del = "Weekly ledger maintenance gig: $40 - $100.";
        }

        return {
            topic: t.charAt(0).toUpperCase() + t.slice(1),
            tagline: "Bridging active skill acquisition directly to localized gig opportunities.",
            sdg: sdgs,
            summary: `${t} represents an immediate, high-utility capability. By focusing on active portfolio creation rather than passive theoretical courses, learners can monetize this skill within weeks.`,
            insights: [
                {
                    title: "Core Capability",
                    icon: "fa-solid fa-brain",
                    badge: "Foundation",
                    text: `Bypasses 50-hour video lectures to focus strictly on real-world execution in ${t}.`
                },
                {
                    title: "Accessible Tooling",
                    icon: "fa-solid fa-toolbox",
                    badge: "High-Value Toolkit",
                    text: `Utilizes accessible tooling (${tool}) requiring minimal hardware to start building immediately.`
                },
                {
                    title: "Gig Monetization",
                    icon: "fa-solid fa-coins",
                    badge: "Local Demand",
                    text: "Transforms manual, time-consuming business bottlenecks into monetizable services."
                }
            ],
            roadmap: [
                {
                    step: 1,
                    phase: "Micro-bite Learn",
                    title: "Foundational Execution",
                    timeframe: "Days 1-3",
                    action: step1,
                    deliverable: step1Del
                },
                {
                    step: 2,
                    phase: "Proof-of-Work Project",
                    title: "Localized Portfolio Build",
                    timeframe: "Days 4-7",
                    action: step2,
                    deliverable: step2Del
                },
                {
                    step: 3,
                    phase: "Local Gig Monetization",
                    title: "Direct Client Pitch",
                    timeframe: "Week 2+",
                    action: step3,
                    deliverable: step3Del
                }
            ],
            flashcards: [
                {
                    question: `What makes ${t} immediately monetizable in local economies?`,
                    answer: "Most local small businesses operate on manual, error-prone workflows and eagerly pay for immediate time-saving solutions.",
                    proTip: "Never sell abstract skills—always pitch the concrete hours and money saved."
                },
                {
                    question: "How do you prove competence without formal certifications?",
                    answer: "A publicly accessible proof-of-work project hosted on GitHub or Google Drive solving a verified real-world problem.",
                    proTip: "One working portfolio artifact beats ten theoretical completion certificates."
                },
                {
                    question: "How does this align with the UN Sustainable Development Goals?",
                    answer: "It creates a direct bridge from SDG 4 (Quality Education) to SDG 8 (Decent Work & Economic Resurgence).",
                    proTip: "True economic empowerment occurs when education translates directly to self-sufficiency."
                },
                {
                    question: "What is the recommended approach to landing your first paid client?",
                    answer: "Offer a zero-risk, high-value pilot for a local business to automate or resolve one painful operational bottleneck.",
                    proTip: "Turn that initial successful pilot into a recurring monthly maintenance retainer."
                }
            ]
        };
    }

    // Main execution function
    async function executeMapping(topic) {
        if (!topic) return;

        // UI state transitions
        if (mapperResults) mapperResults.classList.add("hidden");
        if (mapperError) mapperError.classList.add("hidden");
        if (mapperLoading) mapperLoading.classList.remove("hidden");

        const statusPhases = [
            "Connecting to KEPLER AI Engine...",
            "Analyzing localized gig opportunities & SDG alignment...",
            "Synthesizing NotebookLM-style visual flashcards & flowchart...",
            "Finalizing personalized 3-step pathway..."
        ];

        let phaseIdx = 0;
        const statusInterval = setInterval(() => {
            phaseIdx = (phaseIdx + 1) % statusPhases.length;
            if (loadingStatusText) loadingStatusText.textContent = statusPhases[phaseIdx];
        }, 800);

        const customApiKey = localStorage.getItem(STORAGE_KEY) || "";

        try {
            let data = null;
            let source = "KEPLER Knowledge Engine";

            try {
                const response = await fetch("/api/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-gemini-api-key": customApiKey
                    },
                    body: JSON.stringify({
                        topic: topic,
                        apiKey: customApiKey
                    })
                });

                if (response.ok) {
                    const json = await response.json();
                    if (json && json.success && json.data) {
                        data = json.data;
                        source = json.source || "Google Gemini AI";
                    }
                }
            } catch (netErr) {
                console.warn("Backend API unreachable, using resilient client-side generator:", netErr);
            }

            // Fallback to client generator if backend is cold/offline
            if (!data) {
                data = getClientFallback(topic);
                source = "KEPLER Knowledge Engine (Local)";
            }

            clearInterval(statusInterval);
            if (mapperLoading) mapperLoading.classList.add("hidden");

            renderMapperResults(data, source);

        } catch (err) {
            clearInterval(statusInterval);
            if (mapperLoading) mapperLoading.classList.add("hidden");
            if (mapperError) {
                mapperError.classList.remove("hidden");
                if (errorMessage) errorMessage.textContent = err.message || "An unexpected error occurred while generating your pathway.";
            }
        }
    }

    // Render results to DOM
    function renderMapperResults(data, source) {
        if (!mapperResults) return;

        // Header info
        if (resultTitle) resultTitle.textContent = data.topic || "Skill Pathway";
        if (resultTagline) resultTagline.textContent = data.tagline || "";
        if (resultSummary) resultSummary.textContent = data.summary || "";
        if (engineBadge) {
            const isGemini = source.toLowerCase().includes("gemini");
            engineBadge.innerHTML = isGemini 
                ? '<i class="fa-solid fa-wand-magic-sparkles"></i> Google Gemini AI' 
                : '<i class="fa-solid fa-satellite"></i> KEPLER Engine';
        }

        // SDG Pills
        if (sdgPillGroup) {
            sdgPillGroup.innerHTML = "";
            const tags = Array.isArray(data.sdg) ? data.sdg : ["SDG 4", "SDG 8"];
            tags.forEach(t => {
                const pill = document.createElement("span");
                pill.className = "sdg-pill";
                pill.textContent = t;
                sdgPillGroup.appendChild(pill);
            });
        }

        // 1. Visual Insights (NotebookLM Style)
        if (insightsGrid) {
            insightsGrid.innerHTML = "";
            const insights = data.insights || [];
            insights.forEach(item => {
                const card = document.createElement("div");
                card.className = "insight-card";
                card.innerHTML = `
                    <div class="insight-header">
                        <i class="${item.icon || 'fa-solid fa-lightbulb'} insight-icon"></i>
                        <span class="insight-badge">${item.badge || 'Insight'}</span>
                    </div>
                    <h4>${item.title || 'Key Finding'}</h4>
                    <p>${item.text || ''}</p>
                `;
                insightsGrid.appendChild(card);
            });
        }

        // 2. 3-Step Localized Roadmap Flowchart
        if (flowchartContainer) {
            flowchartContainer.innerHTML = "";
            const steps = data.roadmap || [];
            steps.forEach((step, idx) => {
                const node = document.createElement("div");
                node.className = "flowchart-node";
                node.innerHTML = `
                    <span class="node-step-badge">STEP 0${step.step || idx + 1}</span>
                    <span class="node-timeframe">${step.timeframe || `Phase ${idx + 1}`}</span>
                    <h4>${step.title || step.phase || 'Action Step'}</h4>
                    <p class="node-action">${step.action || ''}</p>
                    <div class="node-deliverable">
                        <strong>Deliverable:</strong> ${step.deliverable || 'Working Project'}
                    </div>
                `;
                flowchartContainer.appendChild(node);

                // Add arrow connector between nodes
                if (idx < steps.length - 1) {
                    const arrow = document.createElement("div");
                    arrow.className = "flowchart-arrow";
                    arrow.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
                    flowchartContainer.appendChild(arrow);
                }
            });
        }

        // 3. Interactive Study Flashcards (NotebookLM Style)
        if (flashcardsGrid) {
            flashcardsGrid.innerHTML = "";
            const flashcards = data.flashcards || [];
            flashcards.forEach((card, idx) => {
                const scene = document.createElement("div");
                scene.className = "flashcard-scene";
                scene.innerHTML = `
                    <div class="flashcard-inner" data-card-idx="${idx}">
                        <!-- Front Face -->
                        <div class="flashcard-front">
                            <div class="card-top-tag">
                                <span><i class="fa-solid fa-circle-question"></i> FLASHCARD 0${idx + 1}</span>
                                <span>QUESTION</span>
                            </div>
                            <div class="card-question">${card.question || 'Concept Question'}</div>
                            <div class="card-prompt">
                                <span>Click to reveal answer</span> <i class="fa-solid fa-arrow-rotate-right"></i>
                            </div>
                        </div>
                        <!-- Back Face -->
                        <div class="flashcard-back">
                            <div class="card-top-tag">
                                <span><i class="fa-solid fa-circle-check"></i> FLASHCARD 0${idx + 1}</span>
                                <span style="color: #32d74b;">ANSWER</span>
                            </div>
                            <div class="card-answer">${card.answer || 'Answer concept'}</div>
                            ${card.proTip ? `<div class="card-protip"><strong>Pro-Tip:</strong> ${card.proTip}</div>` : ''}
                            <div class="card-prompt">
                                <span>Click to flip back</span> <i class="fa-solid fa-arrow-rotate-left"></i>
                            </div>
                        </div>
                    </div>
                `;

                // Wire up click-to-flip
                const inner = scene.querySelector(".flashcard-inner");
                inner.addEventListener("click", () => {
                    inner.classList.toggle("flipped");
                });

                flashcardsGrid.appendChild(scene);
            });
        }

        // Flip all cards button
        if (flipAllBtn) {
            let allFlipped = false;
            flipAllBtn.onclick = () => {
                const inners = flashcardsGrid.querySelectorAll(".flashcard-inner");
                allFlipped = !allFlipped;
                inners.forEach(el => {
                    if (allFlipped) el.classList.add("flipped");
                    else el.classList.remove("flipped");
                });
                flipAllBtn.textContent = allFlipped ? "Reset All" : "Flip All";
            };
        }

        // Display results with animation
        mapperResults.classList.remove("hidden");
        mapperResults.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
});
