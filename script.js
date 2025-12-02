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

    // Add-ons and Price Calculator
    class PriceCalculator {
        constructor() {
            this.addonCheckboxes = $$('.addon-checkbox');
            this.tierSelector = $$('input[name="tier"]');
            this.estimatedCostElement = $('#estimated-cost');
            this.init();
        }

        init() {
            // Listen for addon changes
            this.addonCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    this.updatePrice();
                });
            });

            // Listen for tier changes
            this.tierSelector.forEach(radio => {
                radio.addEventListener('change', () => {
                    this.updateTierRecommendation();
                    this.updatePrice();
                });
            });

            // Initialize with default values
            this.updateTierRecommendation();
            this.updatePrice();
        }

        updateTierRecommendation() {
            const selectedTier = $('input[name="tier"]:checked');
            if (!selectedTier) return;

            const tierValue = selectedTier.value;
            const recommendation = CONFIG.tierRecommendations[tierValue];
            
            if (recommendation) {
                // Update throughput
                const throughputElement = $('#recommended-throughput');
                if (throughputElement) {
                    throughputElement.textContent = recommendation.throughput;
                }

                // Update recommended add-ons
                const addonsElement = $('#recommended-addons');
                if (addonsElement) {
                    const addonNames = recommendation.addons.map(addonId => {
                        const checkbox = $(`#${addonId}`);
                        return checkbox ? this.getAddonName(addonId) : '';
                    }).filter(name => name);
                    
                    addonsElement.textContent = addonNames.join(', ') || 'None';
                }

                // Auto-select recommended add-ons
                this.addonCheckboxes.forEach(checkbox => {
                    checkbox.checked = recommendation.addons.includes(checkbox.id);
                });
            }
        }

        getAddonName(addonId) {
            const names = {
                'delta-sorting': 'Delta Sorting',
                'delay-machine': 'Delay Machine',
                'washing-station': 'Washing Station'
            };
            return names[addonId] || '';
        }

        updatePrice() {
            const selectedTier = $('input[name="tier"]:checked');
            if (!selectedTier || !this.estimatedCostElement) return;

            const tierValue = selectedTier.value;
            const recommendation = CONFIG.tierRecommendations[tierValue];
            let totalPrice = CONFIG.basePrices[recommendation.basePrice] || 0;

            // Add selected addon prices
            this.addonCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const addonPrice = parseInt(checkbox.dataset.price) || 0;
                    totalPrice += addonPrice;
                }
            });

            // Format and display price
            this.estimatedCostElement.textContent = this.formatPrice(totalPrice);
        }

        formatPrice(price) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(price);
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