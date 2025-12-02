/**
 * Qatmeer Landing Page JavaScript
 * Handles navigation, modal, form submission, price calculator, and cookie consent
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        demoVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1', // Placeholder YouTube video
        formEndpoint: 'https://formspree.io/f/your_form_id', // Replace with actual Formspree endpoint
        cookieConsentKey: 'qatmeer_cookie_consent',
        
        // Pricing configuration
        basePrices: {
            pilot: 15000,
            production: 35000,
            enterprise: 65000
        },
        
        addonPrices: {
            'delta-sorting': 5000,
            'delay-machine': 3000,
            'washing-station': 4000
        },

        tierRecommendations: {
            small: {
                throughput: '500kg/hour',
                addons: ['washing-station'],
                basePrice: 'pilot'
            },
            medium: {
                throughput: '2,000kg/hour',
                addons: ['delta-sorting', 'delay-machine'],
                basePrice: 'production'
            },
            large: {
                throughput: '5,000kg/hour+',
                addons: ['delta-sorting', 'delay-machine', 'washing-station'],
                basePrice: 'enterprise'
            }
        }
    };

    // Utility functions
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Cookie Consent Management
    class CookieConsent {
        constructor() {
            this.banner = $('#cookieConsent');
            this.acceptButton = $('#acceptCookies');
            this.init();
        }

        init() {
            if (!this.hasConsent()) {
                this.showBanner();
            }

            if (this.acceptButton) {
                this.acceptButton.addEventListener('click', () => this.acceptCookies());
            }
        }

        hasConsent() {
            return localStorage.getItem(CONFIG.cookieConsentKey) === 'accepted';
        }

        showBanner() {
            if (this.banner) {
                this.banner.classList.add('show');
            }
        }

        acceptCookies() {
            localStorage.setItem(CONFIG.cookieConsentKey, 'accepted');
            if (this.banner) {
                this.banner.classList.remove('show');
            }
        }
    }

    // Mobile Navigation
    class MobileNavigation {
        constructor() {
            this.navToggle = $('.nav-toggle');
            this.navMenu = $('.nav-menu');
            this.navLinks = $$('.nav-menu a');
            this.init();
        }

        init() {
            if (this.navToggle) {
                this.navToggle.addEventListener('click', () => this.toggleMenu());
                
                // Set initial ARIA state
                this.navToggle.setAttribute('aria-expanded', 'false');
            }

            // Close menu when clicking on links
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-container')) {
                    this.closeMenu();
                }
            });

            // Handle escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeMenu();
                }
            });
        }

        toggleMenu() {
            const isOpen = this.navMenu.classList.contains('active');
            
            if (isOpen) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        }

        openMenu() {
            this.navMenu.classList.add('active');
            this.navToggle.classList.add('active');
            this.navToggle.setAttribute('aria-expanded', 'true');
            
            // Focus first menu item for accessibility
            const firstLink = this.navMenu.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        }

        closeMenu() {
            this.navMenu.classList.remove('active');
            this.navToggle.classList.remove('active');
            this.navToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Smooth Scrolling
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            // Handle navigation links
            $$('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    
                    if (href === '#') return;
                    
                    const target = $(href);
                    if (target) {
                        e.preventDefault();
                        this.scrollToElement(target);
                    }
                });
            });
        }

        scrollToElement(element) {
            const navHeight = $('.navbar').offsetHeight;
            const targetPosition = element.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Demo Video Modal
    class DemoModal {
        constructor() {
            this.modal = $('#demoModal');
            this.openButton = $('#watchDemo');
            this.closeButton = $('.modal-close');
            this.video = $('#demoVideo');
            this.init();
        }

        init() {
            if (this.openButton) {
                this.openButton.addEventListener('click', () => this.openModal());
            }

            if (this.closeButton) {
                this.closeButton.addEventListener('click', () => this.closeModal());
            }

            // Close modal when clicking outside
            if (this.modal) {
                this.modal.addEventListener('click', (e) => {
                    if (e.target === this.modal) {
                        this.closeModal();
                    }
                });
            }

            // Handle escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }

        openModal() {
            if (this.modal && this.video) {
                this.video.src = CONFIG.demoVideoUrl;
                this.modal.classList.add('active');
                this.modal.setAttribute('aria-hidden', 'false');
                
                // Focus the close button for accessibility
                if (this.closeButton) {
                    this.closeButton.focus();
                }

                // Prevent body scroll
                document.body.style.overflow = 'hidden';
            }
        }

        closeModal() {
            if (this.modal && this.video) {
                this.video.src = '';
                this.modal.classList.remove('active');
                this.modal.setAttribute('aria-hidden', 'true');
                
                // Restore body scroll
                document.body.style.overflow = '';

                // Return focus to trigger button
                if (this.openButton) {
                    this.openButton.focus();
                }
            }
        }
    }

    // FAQ Accordion
    class FAQAccordion {
        constructor() {
            this.faqItems = $$('.faq-item');
            this.init();
        }

        init() {
            this.faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                
                if (question && answer) {
                    question.addEventListener('click', () => {
                        this.toggleFAQ(question, answer);
                    });

                    // Set initial ARIA state
                    question.setAttribute('aria-expanded', 'false');
                }
            });
        }

        toggleFAQ(question, answer) {
            const isOpen = question.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQs
            this.faqItems.forEach(item => {
                const otherQuestion = item.querySelector('.faq-question');
                const otherAnswer = item.querySelector('.faq-answer');
                
                if (otherQuestion !== question) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.style.maxHeight = '';
                }
            });

            // Toggle current FAQ
            if (isOpen) {
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '';
            } else {
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        }
    }

    // Fixed Tier + Add-ons calculator (handles mutually-exclusive sorting)
    class PriceCalculator {
        constructor() {
            this.tierSelect = $('#tierSelect');
            this.addonsForm = $('#addonsForm');
            this.subtotalEl = $('#subtotal');
            this.init();
        }

        init() {
            // Hook events
            if (this.tierSelect) this.tierSelect.addEventListener('change', () => this.calcSubtotal());
            if (this.addonsForm) this.addonsForm.addEventListener('change', () => this.calcSubtotal());
            
            const sortingRadios = $$('input[name="sorting"]');
            sortingRadios.forEach(r => r.addEventListener('change', () => this.calcSubtotal()));

            // Initial calc
            this.calcSubtotal();
        }

        getSelectedTierBase() {
            if (!this.tierSelect) return 0;
            const sel = this.tierSelect.options[this.tierSelect.selectedIndex];
            return Number(sel.value) || 0;
        }

        getSortingCost() {
            // Radios named 'sorting'
            const radios = $$('input[name="sorting"]');
            for (const r of radios) {
                if (r.checked) {
                    const cost = Number(r.dataset.cost || 0);
                    return cost;
                }
            }
            return 0;
        }

        getAddonsSum() {
            let s = 0;
            if (!this.addonsForm) return 0;
            const checkboxes = this.addonsForm.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => { 
                if (cb.checked) s += Number(cb.value || 0); 
            });
            return s;
        }

        calcSubtotal() {
            if (!this.subtotalEl) return;
            
            // Base tier includes rod system by design; delta will be added as an upgrade (not additive with rod)
            const base = this.getSelectedTierBase();
            const sortingCost = this.getSortingCost(); // delta cost or 0
            const addons = this.getAddonsSum();        // delay, wash etc.
            const total = base + sortingCost + addons;
            
            this.subtotalEl.textContent = total.toLocaleString() + " SAR";
        }
    }

    // Contact Form Handler
    class ContactForm {
        constructor() {
            this.form = $('.contact-form');
            this.statusElement = $('#form-status');
            this.init();
        }

        init() {
            if (this.form) {
                this.form.addEventListener('submit', (e) => {
                    this.handleSubmit(e);
                });

                // Add real-time validation
                const inputs = this.form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('blur', () => {
                        this.validateField(input);
                    });
                });
            }
        }

        async handleSubmit(e) {
            e.preventDefault();

            // Validate form
            if (!this.validateForm()) {
                this.showStatus('Please fill in all required fields correctly.', 'error');
                return;
            }

            // Show loading state
            const submitButton = this.form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            try {
                const formData = new FormData(this.form);
                
                // Check if Formspree endpoint is configured
                const action = this.form.getAttribute('action');
                if (action.includes('your_form_id')) {
                    // Simulate form submission for demo
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    this.showStatus('Thank you for your message! We\'ll get back to you soon. (This is a demo - please configure Formspree to actually send emails)', 'success');
                    this.form.reset();
                } else {
                    // Actually submit to Formspree
                    const response = await fetch(action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        this.showStatus('Thank you for your message! We\'ll get back to you soon.', 'success');
                        this.form.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                this.showStatus('Sorry, there was an error sending your message. Please try again or email us directly.', 'error');
            } finally {
                // Restore button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        }

        validateForm() {
            const requiredFields = this.form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });

            return isValid;
        }

        validateField(field) {
            const value = field.value.trim();
            let isValid = true;

            // Remove existing error styling
            field.classList.remove('error');

            // Check required fields
            if (field.hasAttribute('required') && !value) {
                isValid = false;
            }

            // Validate email
            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                }
            }

            // Add error styling if invalid
            if (!isValid) {
                field.classList.add('error');
            }

            return isValid;
        }

        showStatus(message, type) {
            if (this.statusElement) {
                // Use multilingual messages if available
                const messages = window.qatmeerMessages;
                if (messages && type === 'success') {
                    message = messages.success;
                } else if (messages && type === 'error') {
                    message = messages.error;
                }

                this.statusElement.textContent = message;
                this.statusElement.className = `form-status ${type}`;
                this.statusElement.style.display = 'block';

                // Auto-hide after 5 seconds
                setTimeout(() => {
                    this.statusElement.style.display = 'none';
                }, 5000);
            }
        }
    }

    // Navbar Scroll Effect
    class NavbarScroll {
        constructor() {
            this.navbar = $('.navbar');
            this.init();
        }

        init() {
            if (this.navbar) {
                window.addEventListener('scroll', debounce(() => {
                    this.updateNavbar();
                }, 10));
            }
        }

        updateNavbar() {
            const scrolled = window.scrollY > 50;
            
            if (scrolled) {
                this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                this.navbar.style.boxShadow = 'none';
            }
        }
    }

    // Intersection Observer for Animations
    class AnimationObserver {
        constructor() {
            this.init();
        }

        init() {
            if ('IntersectionObserver' in window) {
                const options = {
                    root: null,
                    rootMargin: '0px 0px -100px 0px',
                    threshold: 0.1
                };

                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                            this.observer.unobserve(entry.target);
                        }
                    });
                }, options);

                // Observe elements that should animate in
                const animatedElements = $$('.feature-card, .timeline-item, .pricing-card, .team-member, .testimonial-card');
                animatedElements.forEach(element => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    this.observer.observe(element);
                });

                // Add CSS for animate-in class
                const style = document.createElement('style');
                style.textContent = `
                    .animate-in {
                        opacity: 1 !important;
                        transform: translateY(0) !important;
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    // Analytics and Tracking (Placeholder)
    class Analytics {
        constructor() {
            this.init();
        }

        init() {
            // Track important interactions
            this.trackClicks();
            this.trackFormSubmissions();
            this.trackVideoPlays();
        }

        trackClicks() {
            // Track CTA button clicks
            $$('.btn-primary, .btn-secondary').forEach(button => {
                button.addEventListener('click', (e) => {
                    const buttonText = button.textContent.trim();
                    this.trackEvent('CTA Click', buttonText);
                });
            });

            // Track pricing plan selections
            $$('.pricing-card .btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const planName = button.closest('.pricing-card').querySelector('.plan-name').textContent;
                    this.trackEvent('Pricing Plan Click', planName);
                });
            });
        }

        trackFormSubmissions() {
            const form = $('.contact-form');
            if (form) {
                form.addEventListener('submit', () => {
                    this.trackEvent('Form Submission', 'Contact Form');
                });
            }
        }

        trackVideoPlays() {
            const watchDemoButton = $('#watchDemo');
            if (watchDemoButton) {
                watchDemoButton.addEventListener('click', () => {
                    this.trackEvent('Video Play', 'Demo Video');
                });
            }
        }

        trackEvent(action, label) {
            // Placeholder for analytics tracking
            // Replace with your analytics service (Google Analytics, Plausible, etc.)
            console.log('Analytics Event:', { action, label });
            
            // Example Google Analytics 4 tracking:
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', action, {
            //         event_category: 'engagement',
            //         event_label: label
            //     });
            // }
        }
    }

    // Language Toggle
    class LanguageToggle {
        constructor() {
            this.currentLang = 'en';
            this.langButton = $('#langToggle');
            this.langText = $('.lang-text');
            this.init();
        }

        init() {
            if (this.langButton) {
                this.langButton.addEventListener('click', () => this.toggleLanguage());
            }

            // Check for stored language preference
            const stored = localStorage.getItem('qatmeer_language');
            if (stored && stored === 'ar') {
                this.switchToArabic();
            }
        }

        toggleLanguage() {
            if (this.currentLang === 'en') {
                this.switchToArabic();
            } else {
                this.switchToEnglish();
            }
        }

        switchToArabic() {
            this.currentLang = 'ar';
            document.documentElement.setAttribute('lang', 'ar');
            document.documentElement.setAttribute('dir', 'rtl');
            
            if (this.langText) {
                this.langText.textContent = 'English';
            }

            // Update page title and meta description
            document.title = "قطمير — نظام فرز وتقييم التمر آليًا";
            const metaDesc = $('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', "قطمير يوفّر حلًّا آليًا لفرز وتصنيف التمر باستخدام روبوتات منخفضة التكلفة وذكاء اصطناعي يعمل محليًا. أنظمة جاهزة للتجربة الميدانية وقابلة للتوسيع للمصانع. قدِّم لطلب العرض التجريبي.");
            }

            this.updateContent('ar');
            localStorage.setItem('qatmeer_language', 'ar');
        }

        switchToEnglish() {
            this.currentLang = 'en';
            document.documentElement.setAttribute('lang', 'en');
            document.documentElement.setAttribute('dir', 'ltr');
            
            if (this.langText) {
                this.langText.textContent = 'عربي';
            }

            // Update page title and meta description
            document.title = "Qatmeer — Automated Date Sorting & Quality Control";
            const metaDesc = $('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', "Qatmeer automates sorting and grading of dates using low-cost robotics and on-edge AI. Pilot-ready systems for small producers and scalable solutions for industrial lines. Request early access.");
            }

            this.updateContent('en');
            localStorage.setItem('qatmeer_language', 'en');
        }

        updateContent(lang) {
            // Find all elements with data-en and data-ar attributes
            const elements = $$('[data-en][data-ar]');
            
            elements.forEach(element => {
                const content = element.getAttribute(`data-${lang}`);
                if (content) {
                    element.textContent = content;
                }
            });

            // Update select options
            const selectOptions = $$('option[data-en][data-ar]');
            selectOptions.forEach(option => {
                const content = option.getAttribute(`data-${lang}`);
                if (content) {
                    option.textContent = content;
                }
            });

            // Update form success message
            this.updateFormMessages(lang);
        }

        updateFormMessages(lang) {
            const messages = {
                en: {
                    success: "Thanks — we received your request. We'll contact you within 3 business days.",
                    error: "Sorry, there was an error sending your message. Please try again or email us directly."
                },
                ar: {
                    success: "شكرًا — تم استلام طلبك. سنتواصل معك خلال ٣ أيام عمل.",
                    error: "عذرًا، حدث خطأ في إرسال رسالتك. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة."
                }
            };
            
            // Store messages for use by contact form
            window.qatmeerMessages = messages[lang];
        }
    }

    // Initialize all components when DOM is ready
    function initializeApp() {
        new CookieConsent();
        new MobileNavigation();
        new SmoothScroll();
        new DemoModal();
        new FAQAccordion();
        new PriceCalculator();
        new ContactForm();
        new NavbarScroll();
        new AnimationObserver();
        new Analytics();
        new LanguageToggle();
        
        console.log('Qatmeer landing page initialized successfully!');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }

    // Add error styles for form validation
    const errorStyles = document.createElement('style');
    errorStyles.textContent = `
        .form-group input.error,
        .form-group textarea.error {
            border-color: #DC3545;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }
    `;
    document.head.appendChild(errorStyles);

})();