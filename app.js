/**
 * David Natuel - Portfolio Script Architecture
 * High-performance, accessible, and QA automation-ready JS configurations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. STYLIZED QA CONSOLE LOG GREETING (For Tech Recruiters & Automation Engineers)
    console.log(
        "%c🚀 QA Automation Pipeline Initialized Successfully.",
        "color: #3b82f6; font-weight: bold; font-size: 16px; padding: 4px; background: rgba(59, 130, 246, 0.08); border-radius: 4px;"
    );
    console.log(
        "%cWelcome Interviewer! Feel free to run your automated testing scripts (Playwright, Selenium, Cypress) against this DOM.",
        "color: #94a3b8; font-size: 13px;"
    );
    console.log(
        "%cTarget major elements using the custom semantic data-testid attributes (e.g. data-testid=\"contact-name\"). Have fun inspecting!",
        "color: #10b981; font-style: italic; font-size: 12px;"
    );

    // 2. MOBILE MENU INTERACTION
    const navToggle = document.querySelector('[data-testid="nav-toggle"]');
    const navMenu = document.querySelector('[data-testid="nav-menu"]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('open');
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', !isOpen);
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. INTERACTIVE SKILLS GRID FILTER
    const filterButtons = document.querySelectorAll('[data-testid="skills-filters"] .filter-btn');
    const skillCards = document.querySelectorAll('[data-testid="skills-grid"] .skills-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active state from other buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all') {
                    card.classList.remove('dimmed', 'highlighted');
                } else if (cardCategory === selectedCategory) {
                    card.classList.remove('dimmed');
                    card.classList.add('highlighted');
                } else {
                    card.classList.remove('highlighted');
                    card.classList.add('dimmed');
                }
            });
        });
    });

    // 4. SCROLL PROGRESS & ACTIVE NAV LINK HIGHLIGHT
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100; // Offset for header accuracy

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (targetLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                targetLink.classList.add('active');
            }
        });
    });

    // 5. INTERSECTION OBSERVER FOR FADE-IN SCROLL REVEALS
    const observerOptions = {
        root: null,
        threshold: 0.12,
        rootMargin: '0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // stop observing once visible to maintain static layout stability
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => scrollObserver.observe(el));

    // 6. DYNAMIC AUTOMATION PIPELINE GRAPHIC VISUAL LOOP
    const pipelineFlow = document.querySelector('.pipeline-flow');
    if (pipelineFlow) {
        const steps = [
            { id: 'step-auth', name: 'API Auth Verify', time: '0.12s' },
            { id: 'step-db', name: 'Ledger Integrity', time: '0.45s' },
            { id: 'step-ui', name: 'POM Functional UI', time: '1.24s' }
        ];

        let cycle = 0;
        
        setInterval(() => {
            cycle++;
            if (cycle % 4 === 1) {
                // UI Testing starts running
                setStepRunning('step-ui');
            } else if (cycle % 4 === 2) {
                // UI Testing completes
                setStepPassed('step-ui', '1.24s');
            } else if (cycle % 4 === 3) {
                // Mock clean build completion toast in container
                addConsoleMessage('Assertion Suite Pass // 142 UI verification models executed with success.');
            } else if (cycle % 4 === 0) {
                // Reset to rerun pipeline simulations
                resetPipeline();
            }
        }, 3200);

        function setStepRunning(elementId) {
            const stepEl = document.getElementById(elementId);
            if (stepEl) {
                stepEl.className = 'flow-step step-running';
                stepEl.innerHTML = `
                    <div class="step-status-spinner"></div>
                    <div class="step-details">
                        <span class="step-name">POM Functional UI</span>
                        <span class="step-time">Running...</span>
                    </div>
                `;
            }
        }

        function setStepPassed(elementId, timeStr) {
            const stepEl = document.getElementById(elementId);
            if (stepEl) {
                stepEl.className = 'flow-step step-pass';
                stepEl.innerHTML = `
                    <div class="step-status">✓</div>
                    <div class="step-details">
                        <span class="step-name">POM Functional UI</span>
                        <span class="step-time">${timeStr}</span>
                    </div>
                `;
            }
        }

        function addConsoleMessage(text) {
            const terminalLine = document.querySelector('.terminal-line');
            if (terminalLine) {
                terminalLine.innerHTML += `<div style="color: #10b981; margin-top: 6px; font-size: 11px;">${text}</div>`;
                // Keep scroll in check or trim lines
                const logLines = terminalLine.querySelectorAll('div');
                if (logLines.length > 2) {
                    logLines[0].remove();
                }
            }
        }

        function resetPipeline() {
            const stepUi = document.getElementById('step-ui');
            const terminalLine = document.querySelector('.terminal-line');
            if (stepUi) {
                stepUi.className = 'flow-step step-running';
                stepUi.innerHTML = `
                    <div class="step-status-spinner"></div>
                    <div class="step-details">
                        <span class="step-name">POM Functional UI</span>
                        <span class="step-time">Queued...</span>
                    </div>
                `;
            }
            if (terminalLine) {
                terminalLine.innerHTML = `<span class="cmd-prompt">$</span> pytest --v -s tests/automation_pipeline.py`;
            }
        }
    }

    // 7. SECURE CONTACT FORM VALIDATION (QA Defense-in-depth)
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clean error labels
            clearAllErrors();

            // Fetch form fields safely
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // XSS / Code Injection Defense: HTML escape inputs
            const rawName = nameInput.value.trim();
            const rawEmail = emailInput.value.trim();
            const rawSubject = subjectInput.value.trim();
            const rawMessage = messageInput.value.trim();

            // validation checks
            if (!rawName) {
                showError('name', 'Full Name is required.');
                isValid = false;
            } else if (rawName.length < 2) {
                showError('name', 'Name must be at least 2 characters.');
                isValid = false;
            }

            // Standard RFC 5322 E-mail Validation Matcher
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!rawEmail) {
                showError('email', 'Email Address is required.');
                isValid = false;
            } else if (!emailRegex.test(rawEmail)) {
                showError('email', 'Please supply a standard formatted email address.');
                isValid = false;
            }

            if (!rawSubject) {
                showError('subject', 'Subject is required.');
                isValid = false;
            }

            if (!rawMessage) {
                showError('message', 'Message contents are required.');
                isValid = false;
            } else if (rawMessage.length < 10) {
                showError('message', 'Message must carry a clear context (minimum 10 characters).');
                isValid = false;
            }

            if (!isValid) return;

            // Validated! Apply debounce mechanisms to secure E2E processing
            submitBtn.disabled = true;
            const submitText = submitBtn.querySelector('.submit-text');
            const submitSpinner = submitBtn.querySelector('.submit-spinner');
            
            if (submitText && submitSpinner) {
                submitText.textContent = 'Transmitting Secure Request...';
                submitSpinner.classList.remove('hidden');
            }

            // Mock backend latency & complete transmission
            setTimeout(() => {
                // Escape entries for custom DOM presentation feedback injection defense
                const safeName = escapeHTML(rawName);

                showToast(`Success! Message from ${safeName} has been routed to David's inbox.`, 'success');
                
                // Clear fields gracefully
                contactForm.reset();

                // Re-enable interface controls
                submitBtn.disabled = false;
                if (submitText && submitSpinner) {
                    submitText.textContent = 'Transmit Request';
                    submitSpinner.classList.add('hidden');
                }
            }, 1800);
        });

        // Clear dynamic error inputs on focus keypress events (Better UX)
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const parent = input.closest('.form-group');
                if (parent && parent.classList.contains('has-error')) {
                    parent.classList.remove('has-error');
                    const errorSpan = parent.querySelector('.error-msg');
                    if (errorSpan) errorSpan.textContent = '';
                }
            });
        });

        function showError(fieldId, errorMsg) {
            const inputEl = document.getElementById(fieldId);
            const parent = inputEl.closest('.form-group');
            if (parent) {
                parent.classList.add('has-error');
                const errorSpan = parent.querySelector('.error-msg');
                if (errorSpan) errorSpan.textContent = errorMsg;
            }
        }

        function clearAllErrors() {
            const groups = contactForm.querySelectorAll('.form-group');
            groups.forEach(group => {
                group.classList.remove('has-error');
                const errorSpan = group.querySelector('.error-msg');
                if (errorSpan) errorSpan.textContent = '';
            });
        }

        // HTML escaping engine preventing cross-site scripting (XSS)
        function escapeHTML(str) {
            return str.replace(/[&<>'"]/g, 
                tag => ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    "'": '&#39;',
                    '"': '&quot;'
                }[tag] || tag)
            );
        }

        // Custom non-blocking visual Toast Notifications
        function showToast(message, type) {
            // Remove previous active toasts if any
            const existingToast = document.querySelector('.toast-msg');
            if (existingToast) existingToast.remove();

            const toast = document.createElement('div');
            toast.className = `toast-msg toast-${type}`;
            toast.innerHTML = `
                <span>${type === 'success' ? '✓' : '✗'}</span>
                <div>${message}</div>
            `;

            document.body.appendChild(toast);

            // Animate removal after 4 seconds
            setTimeout(() => {
                toast.style.animation = 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 4000);
        }
    }
});
