// ========================================
// DJITT WEBSITE - SCRIPT
// ========================================

// Website interactivity bootstrap
function initializeSite() {
    ensureSolutionsDropdown();
    setupROICalculator();
    setupPayments();
    setupMobileNav();
    setupFrontDoor();
    setupWebsiteLeadHandler();
    setupQuizModal();
    setupAnalytics();
    trackEvent('page_view', {
        path: window.location.pathname,
        referrer: document.referrer || '(direct)'
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSite);
} else {
    initializeSite();
}

function ensureSolutionsDropdown() {
    const menu = document.querySelector('.nav-menu');
    if (!menu || menu.querySelector('.nav-dropdown')) return;

    const dropdown = document.createElement('li');
    dropdown.className = 'nav-dropdown';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'nav-dropdown-toggle';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', 'Open What We Build menu');
    trigger.innerHTML = 'What We Build <span aria-hidden="true">▾</span>';

    const list = document.createElement('ul');
    list.className = 'nav-dropdown-menu';

    const items = [
        ['Websites', '/websites/'],
        ['Client Acquisition', '/client-acquisition/'],
        ['DJITT AI Agent', '/djitt-ai-agent/'],
        ['Lead Follow-Up', '/lead-follow-up/'],
        ['Workflow & Operations', '/workflow-operations/'],
        ['AI Systems', '/ai-systems/'],
        ['Business Systems', '/business-systems/'],
        ['Not Sure', '/not-sure/']
    ];

    items.forEach(([label, href]) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        item.appendChild(link);
        list.appendChild(item);
    });

    dropdown.appendChild(trigger);
    dropdown.appendChild(list);

    const homeItem = menu.querySelector('li');
    if (homeItem && homeItem.nextElementSibling) {
        menu.insertBefore(dropdown, homeItem.nextElementSibling);
    } else {
        menu.appendChild(dropdown);
    }
}

function setupAnalytics() {
    const search = new URLSearchParams(window.location.search);
    const utmEntries = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const utmData = {};

    utmEntries.forEach(key => {
        const value = search.get(key);
        if (value) {
            utmData[key] = value;
        }
    });

    if (Object.keys(utmData).length > 0) {
        sessionStorage.setItem('djitt_utm', JSON.stringify(utmData));
    }

    const pagePath = window.location.pathname.toLowerCase();
    if (pagePath.includes('/front-door')) {
        trackEvent('front_door_started', {
            path: pagePath,
            referrer: document.referrer || '(direct)'
        });
    }

    if (pagePath.includes('/insights')) {
        trackEvent('insight_viewed', {
            path: pagePath,
            referrer: document.referrer || '(direct)'
        });
    }

    if (pagePath.includes('/resources')) {
        trackEvent('resource_viewed', {
            path: pagePath,
            referrer: document.referrer || '(direct)'
        });
    }

    if (pagePath.includes('/websites')) {
        trackEvent('website_service_viewed', {
            path: pagePath,
            referrer: document.referrer || '(direct)'
        });
    }

    document.querySelectorAll('[data-analytics]').forEach(element => {
        element.addEventListener('click', function() {
            const eventName = this.getAttribute('data-analytics');
            const eventMeta = {
                path: window.location.pathname,
                label: this.getAttribute('data-analytics-label') || this.textContent.trim(),
                href: this.getAttribute('href') || ''
            };

            const storedUtm = sessionStorage.getItem('djitt_utm');
            if (storedUtm) {
                try {
                    Object.assign(eventMeta, JSON.parse(storedUtm));
                } catch (error) {
                    console.warn('Unable to parse stored UTM data.', error);
                }
            }

            trackEvent(eventName, eventMeta);
        });
    });
}

function trackEvent(eventName, metadata = {}) {
    const eventPayload = {
        event: eventName,
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        utm: {}
    };

    const storedUtm = sessionStorage.getItem('djitt_utm');
    if (storedUtm) {
        try {
            eventPayload.utm = JSON.parse(storedUtm);
        } catch (error) {
            console.warn('Unable to parse session UTM data.', error);
        }
    }

    Object.assign(eventPayload, metadata);

    if (typeof window !== 'undefined' && window.console) {
        console.info('DJITT Analytics:', eventPayload);
    }
}

// ========================================
// MOBILE NAVIGATION
// ========================================

function setupMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!document.querySelector('.nav-dropdown')) {
        ensureSolutionsDropdown();
    }

    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(function(dropdown) {
        const toggleButton = dropdown.querySelector('.nav-dropdown-toggle');
        const menuList = dropdown.querySelector('.nav-dropdown-menu');
        if (!toggleButton || !menuList) return;

        const setDropdownState = function(isOpen) {
            dropdown.classList.toggle('open', isOpen);
            menuList.classList.toggle('is-open', isOpen);
            toggleButton.setAttribute('aria-expanded', String(isOpen));
        };

        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                setDropdownState(true);
            }
        });

        dropdown.addEventListener('mouseleave', function(event) {
            if (window.innerWidth > 768 && !dropdown.contains(event.relatedTarget)) {
                setDropdownState(false);
            }
        });

        menuList.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                setDropdownState(true);
            }
        });

        menuList.addEventListener('mouseleave', function(event) {
            if (window.innerWidth > 768 && !dropdown.contains(event.relatedTarget)) {
                setDropdownState(false);
            }
        });

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const isOpen = !dropdown.classList.contains('open');
            setDropdownState(isOpen);
        });

        menuList.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                setDropdownState(false);
            });
        });
    });

    toggle.addEventListener('click', function() {
        const isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked
    menu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            dropdowns.forEach(function(dropdown) {
                dropdown.classList.remove('open');
                dropdown.querySelector('.nav-dropdown-menu')?.classList.remove('is-open');
                dropdown.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

// ========================================
// ROI CALCULATOR
// ========================================

function setupROICalculator() {
    const clientsInput = document.getElementById('clients');
    const aumInput = document.getElementById('aum');
    
    if (clientsInput && aumInput) {
        clientsInput.addEventListener('input', updateROI);
        aumInput.addEventListener('input', updateROI);
        
        // Initial calculation
        updateROI();
    }
}

function updateROI() {
    const clientsPerMonth = parseFloat(document.getElementById('clients').value) || 2;
    const avgAUM = parseFloat(document.getElementById('aum').value) || 250000;
    const managementFeeRate = 0.01; // 1%

    // Calculate values
    const clientsPerYear = clientsPerMonth * 12;
    const newAUM = clientsPerYear * avgAUM;
    const annualFees = newAUM * managementFeeRate;

    // Update display
    document.getElementById('clientsPerYear').textContent = clientsPerYear.toLocaleString();
    document.getElementById('newAUM').textContent = '£' + newAUM.toLocaleString('en-GB', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    document.getElementById('annualFees').textContent = '£' + annualFees.toLocaleString('en-GB', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

// ========================================
// STRIPE PAYMENTS
// ========================================

const PAYMENT_CONFIG = {
    mode: 'checkout',
    checkoutEndpoint: '/.netlify/functions/create-checkout-session',
    paymentLink: 'https://buy.stripe.com/7sY9AT6JO1Hc6g68Nyf7i00'
};

function setupPayments() {
    const payButtons = document.querySelectorAll('.js-pay-btn');
    if (!payButtons.length) {
        return;
    }

    payButtons.forEach(button => {
        button.addEventListener('click', async function(event) {
            event.preventDefault();
            await startPaymentFlow(this);
        });
    });
}

async function startPaymentFlow(button) {
    const selectedPlan = button.getAttribute('data-plan') || 'discovery_deposit';

    if (PAYMENT_CONFIG.mode === 'payment-link') {
        if (!PAYMENT_CONFIG.paymentLink) {
            alert('Payment link is not configured yet.');
            return;
        }
        window.location.href = PAYMENT_CONFIG.paymentLink;
        return;
    }

    const originalLabel = button.textContent;
    button.textContent = 'Redirecting...';
    button.setAttribute('aria-busy', 'true');

    try {
        const response = await fetch(PAYMENT_CONFIG.checkoutEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plan: selectedPlan,
                sourcePage: window.location.pathname
            })
        });

        if (!response.ok) {
            throw new Error('Unable to create checkout session.');
        }

        const data = await response.json();
        if (!data.url) {
            throw new Error('No checkout URL returned by server.');
        }

        window.location.href = data.url;
    } catch (error) {
        console.error('Payment start failed:', error);
        alert('Payment could not be started. Please try again or contact us by email.');
        button.textContent = originalLabel;
        button.removeAttribute('aria-busy');
    }
}

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// MOBILE MENU TOGGLE (optional - if needed)
// ========================================

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// ========================================
// UTILITY: Format currency
// ========================================

function formatCurrency(value) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP'
    }).format(value);
}

// ========================================
// ANALYTICS / TRACKING (optional)
// ========================================

// Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const text = this.textContent;
        console.log('CTA Clicked:', text);
        // Send to analytics if GA/Mixpanel added
    });
});

// ========================================
// FORM SUBMISSION (if contact form added)
// ========================================

function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Here you would send formData to a backend API
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Show success message
    form.innerHTML = '<p style="color: green; font-weight: 600;">Thank you! We\'ll be in touch within 24 hours.</p>';
}

// Get current year for copyright
document.querySelectorAll('.current-year').forEach(elem => {
    elem.textContent = new Date().getFullYear();
});

console.log('DJITT website loaded successfully');

// ========================================
// PRACTICE READINESS QUIZ
// ========================================

function setupFrontDoor() {
    const form = document.getElementById('front-door-form');
    if (!form) return;

    const steps = Array.from(form.querySelectorAll('.fd-step'));
    const nextButton = form.querySelector('.fd-next');
    const backButton = form.querySelector('.fd-back');
    const submitButton = form.querySelector('.fd-submit');
    const result = document.getElementById('fd-result');
    const progressFill = document.getElementById('fd-progress-fill');
    const progressText = document.getElementById('fd-progress-text');
    const recommendationTitle = document.getElementById('fd-recommendation-title');
    const recommendationCopy = document.getElementById('fd-recommendation-copy');
    const recommendationPoints = document.getElementById('fd-recommendation-points');
    let currentStep = 0;

    function updateProgress() {
        const percent = ((currentStep + 1) / steps.length) * 100;
        progressFill.style.width = `${percent}%`;
        progressText.textContent = `Step ${currentStep + 1} of ${steps.length}`;
    }

    function goToStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });

        currentStep = stepIndex;
        const isFirstStep = currentStep === 0;
        const isLastStep = currentStep === steps.length - 1;

        backButton.hidden = isFirstStep;
        nextButton.hidden = isLastStep;
        submitButton.hidden = !isLastStep;
        updateProgress();
    }

    function validateCurrentStep() {
        const currentInputs = steps[currentStep].querySelectorAll('input[required]');
        const values = Array.from(currentInputs).filter(input => {
            if (input.type === 'radio') {
                return form.querySelector(`input[name="${input.name}"]:checked`);
            }
            return input.value.trim() !== '';
        });

        return values.length === currentInputs.length;
    }

    nextButton.addEventListener('click', function() {
        if (!validateCurrentStep()) {
            steps[currentStep].reportValidity();
            return;
        }

        goToStep(currentStep + 1);
    });

    backButton.addEventListener('click', function() {
        goToStep(currentStep - 1);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validateCurrentStep()) {
            steps[currentStep].reportValidity();
            return;
        }

        const formData = new FormData(form);
        const payload = {
            challenge: formData.get('challenge'),
            'firm-type': formData.get('firm-type'),
            priority: formData.get('priority'),
            name: formData.get('name'),
            email: formData.get('email'),
            firm: formData.get('firm')
        };

        const challenge = payload.challenge;
        const firmType = payload['firm-type'];
        const priority = payload.priority;
        const name = payload.name;

        const recommendation = getRecommendation(challenge, firmType, priority, name);
        recommendationTitle.textContent = recommendation.title;
        recommendationCopy.textContent = recommendation.copy;
        recommendationPoints.innerHTML = recommendation.points.map(point => `<li>${point}</li>`).join('');

        submitFrontDoor(payload).then(() => {
            form.hidden = true;
            result.hidden = false;
            progressFill.style.width = '100%';
            progressText.textContent = 'Recommendation ready';
        }).catch(() => {
            form.hidden = true;
            result.hidden = false;
            progressFill.style.width = '100%';
            progressText.textContent = 'Recommendation ready';
            recommendationCopy.textContent += ' We have still captured your recommendation locally and you can continue to the next step.';
        });
    });

    function getRecommendation(challenge, firmType, priority, name) {
        const firstName = name ? String(name).split(' ')[0] : 'there';

        if (challenge === 'lead-speed' || priority === 'appointments') {
            return {
                title: 'AI Client Acquisition',
                copy: `Hi ${firstName}, the quickest route for your practice is likely an AI-first client acquisition flow that responds to enquiries quickly, qualifies prospects, and books qualified conversations automatically.`,
                points: [
                    '2-minute lead response and automated qualification',
                    'Calendar booking and follow-up sequences without manual chasing',
                    'Clear visibility into which channels are producing the best leads'
                ]
            };
        }

        if (challenge === 'content' || priority === 'visibility') {
            return {
                title: 'Brand Visibility & Content Engine',
                copy: `Hi ${firstName}, the strongest option for your firm is to build authority and local visibility with a content engine that turns your expertise into trust-building assets.`,
                points: [
                    'Systemised content production and distribution',
                    'More consistent credibility in your target market',
                    'Improved credibility and inbound enquiry quality over time'
                ]
            };
        }

        if (challenge === 'follow-up' || priority === 'systemisation') {
            return {
                title: 'Operations & Follow-Up Automation',
                copy: `Hi ${firstName}, there is likely a strong opportunity to remove manual admin and operational drag from your funnel so your team spends more time with clients and less time doing repetitive follow-up.`,
                points: [
                    'Automated lead qualification and reminder flows',
                    'Consistent follow-up without depending on one person',
                    'Better conversion from warm leads already in your pipeline'
                ]
            };
        }

        return {
            title: 'Growth System Diagnostic',
            copy: `Hi ${firstName}, the best next step is a short diagnostic conversation so we can map your current bottlenecks, your current pipeline, and the fastest way to align your marketing and automation around revenue.`,
            points: [
                'Clear review of how prospects currently enter and move through your funnel',
                'Recommendation tied to your growth goals, current setup and constraints',
                'A practical plan for high-value conversion and operational efficiency'
            ]
        };
    }

    goToStep(0);
}

async function submitFrontDoor(payload) {
    const response = await fetch('/.netlify/functions/front-door-submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('Front Door submission failed');
    }

    return response.json();
}

function setupQuizModal() {
    const modal = document.getElementById('practice-quiz-modal');
    if (!modal) return;

    const openQuizButtons = document.querySelectorAll('[data-open-quiz="true"]');
    const closeTriggers = document.querySelectorAll('[data-close-quiz="true"]');

    const openPracticeQuiz = () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    const closePracticeQuiz = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    openQuizButtons.forEach(button => button.addEventListener('click', openPracticeQuiz));
    closeTriggers.forEach(trigger => trigger.addEventListener('click', closePracticeQuiz));

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closePracticeQuiz();
        }
    });
}

function setupWebsiteLeadHandler() {
    const form = document.getElementById('website-lead-form');
    if (!form) return;

    const success = document.getElementById('website-success');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const payload = {
            name: form.elements.name.value,
            businessName: form.elements.businessName.value,
            phone: form.elements.phone.value,
            email: form.elements.email.value,
            businessType: form.elements.businessType.value,
            hasWebsite: form.elements.hasWebsite.value,
            websiteGoal: form.elements.websiteGoal.value,
            projectTimeline: form.elements.projectTimeline.value,
            brief: form.elements.brief.value,
            source: 'DJITT Website'
        };

        try {
            console.log('Submitting website lead', payload);
            const response = await fetch('/.netlify/functions/website-leads-submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json().catch(() => ({}));
            console.log('Website lead response', { status: response.status, ok: response.ok, result });

            if (!response.ok) {
                const message = result?.message || result?.error || 'Submission failed';
                throw new Error(message);
            }

            form.reset();
            if (success) {
                success.style.display = 'block';
                success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        } catch (error) {
            console.error('Website lead submission failed:', error);
            alert(error?.message || 'Your enquiry could not be submitted right now. Please email hello@djitt.com directly.');
        }
    });
}
