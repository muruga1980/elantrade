// ============================================
// ÉLAN TRADELINKS LLP - Main JavaScript
// ============================================

(function($) {
    'use strict';

    // Global state
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.innerWidth <= 768;

    // ============================================
    // Page Loader
    // ============================================
    function initPageLoader() {
        const loader = document.querySelector('.page-loader');
        if (!loader) return;

        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('loaded');
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 800);
            }, 1800);
        });
    }

    // ============================================
    // Sticky Header
    // ============================================
    function initStickyHeader() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        function updateHeader() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show on scroll direction (optional)
            if (currentScroll > lastScroll && currentScroll > 300) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }

        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader();

        // Smooth transition for header
        header.style.transition = 'transform 0.3s ease, background 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease';
    }

    // ============================================
    // Mobile Navigation
    // ============================================
    function initMobileNav() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.mobile-nav-overlay');
        if (!toggle || !nav) return;

        function openNav() {
            toggle.classList.add('active');
            nav.classList.add('active');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeNav() {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        toggle.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                closeNav();
            } else {
                openNav();
            }
        });

        if (overlay) {
            overlay.addEventListener('click', closeNav);
        }

        // Close on nav link click
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', closeNav);
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeNav();
            }
        });
    }

    // ============================================
    // Scroll Progress Indicator
    // ============================================
    function initScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        function updateProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // ============================================
    // Back to Top Button
    // ============================================
    function initBackToTop() {
        const btn = document.querySelector('.back-to-top');
        if (!btn) return;

        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });

        function toggleVisibility() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        toggleVisibility();
    }

    // ============================================
    // Cursor Glow Effect (Desktop Only)
    // ============================================
    function initCursorGlow() {
        if (isTouchDevice || prefersReducedMotion) return;

        const glow = document.querySelector('.cursor-glow');
        if (!glow) return;

        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        let rafId = null;
        let isActive = false;
        let inactivityTimeout = null;

        function animate() {
            const dx = mouseX - currentX;
            const dy = mouseY - currentY;
            currentX += dx * 0.1;
            currentY += dy * 0.1;
            glow.style.left = currentX + 'px';
            glow.style.top = currentY + 'px';
            rafId = requestAnimationFrame(animate);
        }

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isActive) {
                isActive = true;
                glow.style.opacity = '1';
                rafId = requestAnimationFrame(animate);
            }

            clearTimeout(inactivityTimeout);
            inactivityTimeout = setTimeout(function() {
                isActive = false;
                glow.style.opacity = '0';
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            }, 2000);
        });

        // Handle mouse leave
        document.addEventListener('mouseleave', function() {
            isActive = false;
            glow.style.opacity = '0';
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        });
    }

    // ============================================
    // Animated Counters
    // ============================================
    function initCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-counter'), 10);
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = prefersReducedMotion ? 0 : 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeOut * target);
                        counter.textContent = current + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + suffix;
                        }
                    }

                    if (prefersReducedMotion) {
                        counter.textContent = target + suffix;
                    } else {
                        requestAnimationFrame(updateCounter);
                    }

                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }

    // ============================================
    // Lazy Loading Images
    // ============================================
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img.lazy');
        if (!lazyImages.length) return;

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(function(img) {
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
            });
        }
    }

    // ============================================
    // AOS Initialization
    // ============================================
    function initAOS() {
        if (typeof AOS === 'undefined') return;

        AOS.init({
            duration: prefersReducedMotion ? 0 : 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            disable: prefersReducedMotion ? true : false
        });
    }

    // ============================================
    // Active Menu Highlighting
    // ============================================
    function initActiveMenu() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
        if (!sections.length || !navLinks.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(function(section) {
            observer.observe(section);
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#' || targetId.length <= 1) return;

                const target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            });
        });
    }

    // ============================================
    // Header Scroll Hide/Show on Mobile
    // ============================================
    function initHeaderScrollBehavior() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        let lastScrollY = 0;
        let ticking = false;

        function updateHeaderScroll() {
            const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDown = currentScrollY > lastScrollY;
            const scrollThreshold = 300;

            if (currentScrollY > scrollThreshold) {
                if (scrollDown) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateHeaderScroll);
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================================
    // Product Filter (for Products Page)
    // ============================================
    function initProductFilter() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const productCards = document.querySelectorAll('.product-card[data-category]');
        if (!filterTabs.length || !productCards.length) return;

        filterTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active tab
                filterTabs.forEach(function(t) { t.classList.remove('active'); });
                this.classList.add('active');

                // Filter cards
                productCards.forEach(function(card) {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = '';
                        if (!prefersReducedMotion) {
                            card.style.animation = 'fadeInUp 0.5s ease forwards';
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ============================================
    // Parallax Effect (subtle)
    // ============================================
    function initParallax() {
        if (prefersReducedMotion || isTouchDevice) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (!parallaxElements.length) return;

        let ticking = false;

        function updateParallax() {
            parallaxElements.forEach(function(el) {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
                const rect = el.getBoundingClientRect();
                const scrolled = window.pageYOffset || document.documentElement.scrollTop;
                const rate = scrolled * speed;

                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.style.transform = 'translateY(' + rate + 'px)';
                }
            });
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================================
    // WhatsApp Chat Modal
    // ============================================
    function initWhatsApp() {
        const whatsappBtn = document.querySelector('.whatsapp-float');
        const modalOverlay = document.querySelector('.whatsapp-modal-overlay');
        const modalClose = document.querySelector('.whatsapp-modal-close');
        const modalBtn = document.querySelector('.whatsapp-modal-btn');

        if (!whatsappBtn || !modalOverlay) return;

        // Open modal on float button click
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal on close button click
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close modal on overlay click
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Start chat button redirects to WhatsApp
        if (modalBtn) {
            modalBtn.addEventListener('click', function() {
                const phone = whatsappBtn.getAttribute('data-phone') || '+971567683909';
                const message = encodeURIComponent('Hello ÉLAN TRADELINKS, I am interested in your petrochemical products and would like to discuss further.');
                window.open('https://wa.me/' + phone.replace(/\+/g, '').replace(/\s/g, '') + '?text=' + message, '_blank');
            });
        }
    }

    // ============================================
    // Form Success Alert (Web3Forms)
    // ============================================
    function initFormAlerts() {
        const alert = document.querySelector('.success-alert');
        if (!alert) return;

        window.showSuccessAlert = function(message) {
            const msgEl = alert.querySelector('p');
            if (msgEl) msgEl.textContent = message || 'Your message has been sent successfully!';
            alert.classList.add('show');
            setTimeout(function() {
                alert.classList.remove('show');
            }, 5000);
        };
    }

    // ============================================
    // Hero Video Background Fallback
    // ============================================
    function initHeroVideo() {
        const video = document.querySelector('.hero-video-bg');
        if (!video) return;

        // Handle video loading errors gracefully
        video.addEventListener('error', function() {
            video.style.display = 'none';
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2e2e2e 100%)';
            }
        });

        // Mobile fallback - show poster or gradient
        if (isMobile && video.getAttribute('data-mobile-poster')) {
            video.poster = video.getAttribute('data-mobile-poster');
        }
    }

    // ============================================
    // Initialize Everything
    // ============================================
    function init() {
        initPageLoader();
        initStickyHeader();
        initMobileNav();
        initScrollProgress();
        initBackToTop();
        initCursorGlow();
        initCounters();
        initLazyLoading();
        initAOS();
        initActiveMenu();
        initSmoothScroll();
        initHeaderScrollBehavior();
        initProductFilter();
        initParallax();
        initWhatsApp();
        initFormAlerts();
        initHeroVideo();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-init AOS on window resize (for responsive)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 250);
    });

})(jQuery || {});
