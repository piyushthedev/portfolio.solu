document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation & Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
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

    const textArray = ["AI Enthusiast", "UI/UX Designer", "Data Science Intern", "Problem Solver"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
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

    // Start typing effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // --- Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');

                // If it's the skills section, trigger the progress bar animation
                if (entry.target.classList.contains('skills-grid') || entry.target.closest('.skills-grid')) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.parentElement.previousElementSibling.textContent.includes('Python') ? '85%' :
                            bar.parentElement.previousElementSibling.textContent.includes('Java') ? '80%' :
                                bar.parentElement.previousElementSibling.textContent.includes('HTML') ? '90%' :
                                    bar.parentElement.previousElementSibling.textContent.includes('Figma') ? '85%' :
                                        bar.parentElement.previousElementSibling.textContent.includes('UX') ? '80%' :
                                            bar.parentElement.previousElementSibling.textContent.includes('Photoshop') ? '75%' :
                                                bar.parentElement.previousElementSibling.textContent.includes('Data') ? '80%' :
                                                    bar.parentElement.previousElementSibling.textContent.includes('Problem') ? '90%' : '70%';
                        bar.style.width = targetWidth; // Could optionally read width from inline or dataset
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
});

// --- Lightbox for Graphics Gallery ---
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

// Open certificate by image element ID
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
    // Use full resolution version
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

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});
