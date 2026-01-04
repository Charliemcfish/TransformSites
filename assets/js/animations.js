// ============================================
//     Transform Sites - Scroll Animations
//     Professional & Impressive Effects
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    //      Intersection Observer for Scroll Animations
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // ============================================
    //      Counter Animation for Statistics
    // ============================================

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current) + (element.getAttribute('data-suffix') || '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.getAttribute('data-suffix') || '');
            }
        };

        updateCounter();
    }

    // Observe counters
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                counter.classList.add('counter-animate');
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    //      Image Reveal Animation
    // ============================================

    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                imageObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const images = document.querySelectorAll('.image-reveal');
    images.forEach(img => imageObserver.observe(img));

    // ============================================
    //      Stagger Children Animation
    // ============================================

    const staggerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('stagger-animate');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const staggerContainers = document.querySelectorAll('.stagger-children');
    staggerContainers.forEach(container => staggerObserver.observe(container));

    // ============================================
    //      Scroll Progress Bar
    // ============================================

    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight);
        progressBar.style.transform = `scaleX(${scrolled})`;
    });

    // ============================================
    //      Parallax Effect for Background Images
    // ============================================

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // ============================================
    //      Add Hover Effects to Cards
    // ============================================

    const cards = document.querySelectorAll('.cs-item');
    cards.forEach(card => {
        if (!card.classList.contains('card-hover')) {
            card.classList.add('card-hover');
        }
    });

    // ============================================
    //      Smooth Scroll for Internal Links
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    //      Add Animation Classes on Load
    // ============================================

    // Add animate-on-scroll class to key sections
    const sectionsToAnimate = document.querySelectorAll('.cs-title, .cs-text, .cs-topper');
    sectionsToAnimate.forEach(section => {
        if (!section.closest('.stagger-children')) {
            section.classList.add('animate-on-scroll');
        }
    });

    // ============================================
    //      Button Ripple Effect
    // ============================================

    const buttons = document.querySelectorAll('.cs-button-solid, .cs-submit');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================================
    //      Performance Optimization
    // ============================================

    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0.01ms';
            el.style.animationIterationCount = '1';
            el.style.transitionDuration = '0.01ms';
        });
    }

    // ============================================
    //      Mobile Optimization
    // ============================================

    // Disable parallax on mobile for performance
    if (window.innerWidth < 768) {
        document.querySelectorAll('.parallax-bg, .parallax-element').forEach(el => {
            el.style.transform = 'none';
            el.style.backgroundAttachment = 'scroll';
        });
    }
});

// ============================================
//      Lazy Load Images (Optional Enhancement)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
