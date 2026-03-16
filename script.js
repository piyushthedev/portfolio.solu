/* ═══════════════════════════════════════════════════
   PORTFOLIO SCRIPT — GRANGER-STYLE ANIMATIONS
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── NAVIGATION ──────────────────────────────────
    const menuPill = document.querySelector('.menu-pill');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (menuPill) {
        menuPill.addEventListener('click', () => {
            menuPill.classList.toggle('active');
            navLinks.classList.toggle('active');
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

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuPill && menuPill.classList.remove('active');
            navLinks && navLinks.classList.remove('active');
            const bars = menuPill ? menuPill.querySelectorAll('.bar') : [];
            bars[0] && (bars[0].style.transform = '');
            bars[1] && (bars[1].style.transform = '');
        });
    });

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ─── TYPING EFFECT ────────────────────────────────
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const textArray = ['AI Enthusiast.', 'UI/UX Designer.', 'Data Scientist.', 'Problem Solver.'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textIdx = 0, charIdx = 0;

    function type() {
        if (charIdx < textArray[textIdx].length) {
            cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textIdx].charAt(charIdx++);
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    function erase() {
        if (charIdx > 0) {
            cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textIdx].substring(0, --charIdx);
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textIdx = (textIdx + 1) % textArray.length;
            setTimeout(type, typingDelay + 1100);
        }
    }
    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // ─── SECTION TITLE REVEAL ─────────────────────────
    // Wraps section title text in .title-line > span for slide-up
    document.querySelectorAll('.section-title').forEach(title => {
        // Already has HTML structure (My <span>Stack</span>) — wrap the whole thing
        const raw = title.innerHTML;
        title.innerHTML = `<span class="title-line"><span>${raw}</span></span>`;
    });

    // ─── BRACKET LABELS OBSERVER ──────────────────────
    const labelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('label-visible');
                labelObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.bracket-label').forEach(el => labelObserver.observe(el));

    // ─── SECTION TITLE REVEAL OBSERVER ───────────────
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // small delay so bracket label fires first
                setTimeout(() => {
                    entry.target.classList.add('title-revealed');
                }, 120);
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section-title').forEach(el => titleObserver.observe(el));

    // ─── STAGGERED BENTO CARDS ────────────────────────
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger all .stagger-child siblings in the same parent
                const parent = entry.target.closest(
                    '.skills-grid, .project-grid, .certs-grid, .education-grid, .stats-grid, .gallery-grid'
                );
                if (parent) {
                    const children = parent.querySelectorAll('.stagger-child');
                    children.forEach((child, i) => {
                        setTimeout(() => child.classList.add('stagger-visible'), i * 80);
                    });
                    staggerObserver.unobserve(entry.target);
                } else {
                    entry.target.classList.add('stagger-visible');
                    staggerObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.stagger-child').forEach(el => staggerObserver.observe(el));

    // ─── GENERIC REVEAL ANIMATIONS ────────────────────
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');

            // Trigger progress bars inside skills reveal
            entry.target.querySelectorAll('.progress').forEach(bar => {
                const w = bar.style.width || '70%';
                bar.style.width = '0';
                setTimeout(() => { bar.style.width = w; }, 150);
            });

            obs.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right').forEach(el =>
        revealObserver.observe(el)
    );

    // ─── STATS COUNTER ANIMATION ──────────────────────
    const statEls = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statEls.forEach(el => statsObserver.observe(el));

    function animateCounter(el) {
        const raw = el.textContent.trim();
        const num = parseInt(raw.replace(/[^0-9]/g, '')) || 0;
        const suffix = raw.replace(/[0-9]/g, '');
        if (!num) return;

        let current = 0;
        const step = Math.max(1, Math.ceil(num / 40));

        const tick = () => {
            current = Math.min(current + step, num);
            el.textContent = current + suffix;
            el.classList.add('counting');
            setTimeout(() => el.classList.remove('counting'), 80);
            if (current < num) setTimeout(tick, 30);
        };
        setTimeout(tick, 200);
    }

    // ─── HERO PARALLAX ────────────────────────────────
    const parallaxEl = document.querySelector('.hero-parallax');
    if (parallaxEl) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y < window.innerHeight) {
                parallaxEl.style.transform = `translateY(${y * 0.12}px)`;
            }
        }, { passive: true });
    }

    // ─── SMOOTH SCROLL (for anchor nav links) ─────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ─── GALLERY TOGGLE ──────────────────────────────────
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

// ─── LIGHTBOX ────────────────────────────────────────
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
    lightboxImg.src = img.src.replace('sz=w600', 'sz=w1600');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
