document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation & Mobile Menu ---
    // The menu pill acts as the hamburger toggle on mobile
    const menuPill = document.querySelector('.menu-pill');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (menuPill) {
        menuPill.addEventListener('click', () => {
            menuPill.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Toggle bars animation
            const bars = menuPill.querySelectorAll('.bar');
            if (menuPill.classList.contains('active')) {
                bars[0] && (bars[0].style.transform = 'translateY(6px) rotate(45deg)');
                bars[1] && (bars[1].style.transform = 'translateY(-1px) rotate(-45deg)');
            } else {
                bars[0] && (bars[0].style.transform = '');
                bars[1] && (bars[1].style.transform = '');
            }
        });
    }

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuPill && menuPill.classList.remove('active');
            navLinks && navLinks.classList.remove('active');
            const bars = menuPill ? menuPill.querySelectorAll('.bar') : [];
            bars[0] && (bars[0].style.transform = '');
            bars[1] && (bars[1].style.transform = '');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Typing Effect ---
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["AI Enthusiast.", "UI/UX Designer.", "Data Scientist.", "Problem Solver."];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // --- Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('active');

            // Animate progress bars when skills section enters view
            if (entry.target.classList.contains('skills-grid') ||
                entry.target.closest('.skills-grid')) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width || '70%';
                    bar.style.width = '0';
                    setTimeout(() => { bar.style.width = width; }, 100);
                });
            }

            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- Stats counter animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statsObserver.observe(el));

    function animateCounter(el) {
        const rawText = el.textContent.trim();
        const numText = rawText.replace(/[^0-9]/g, '');
        const suffix = rawText.replace(/[0-9]/g, '');
        const target = parseInt(numText) || 0;
        if (target === 0) return;

        let start = 0;
        const duration = 1200;
        const step = Math.ceil(target / (duration / 16));

        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                el.textContent = target + suffix;
                clearInterval(timer);
            } else {
                el.textContent = start + suffix;
            }
        }, 16);
    }
});

// --- Gallery Toggle ---
function toggleGallery() {
    const wrapper = document.getElementById('gallery-wrapper');
    const btn = document.getElementById('gallery-toggle-btn');
    const isHidden = wrapper.style.display === 'none';
    wrapper.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
        btn.innerHTML = '<i class="fas fa-eye-slash"></i>&nbsp; Hide Design Work';
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        btn.innerHTML = '<i class="fas fa-images"></i>&nbsp; View My Design Work';
    }
}

// --- Lightbox ---
function openCert(imgId) {
    const img = document.getElementById(imgId);
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openLightbox(item) {
    const img = item.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const src = img.src.replace('sz=w600', 'sz=w1600');
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});
