// ===== RELATIONSHIP COUNTER =====
const startDate = new Date('2025-10-21T00:00:00');
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById('counter-days').textContent = days;
    document.getElementById('counter-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('counter-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('counter-seconds').textContent = String(seconds).padStart(2, '0');
}
updateCounter();
setInterval(updateCounter, 1000);

// ===== BIRTHDAY COUNTER =====
function updateBirthdayCountdowns() {
    function getRemainingTime(month, day) {
        const now = new Date();
        const currentYear = now.getFullYear();
        let nextBday = new Date(currentYear, month - 1, day);

        if (now > nextBday) {
            nextBday.setFullYear(currentYear + 1);
        }

        const diff = nextBday - now;

        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true };

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds, isToday: false };
    }

    const meTime = getRemainingTime(11, 24); // 24 November
    const herTime = getRemainingTime(1, 15); // 15 Januari

    // Update Me
    if (meTime.isToday) {
        const container = document.getElementById('countdown-me-container');
        if (container) container.innerHTML = '<span class="script-font" style="font-size: 1.5rem; color: var(--rose);">Happy Birthday! 🎉</span>';
    } else {
        const d = document.getElementById('me-days');
        if (d) {
            d.textContent = meTime.days;
            document.getElementById('me-hours').textContent = String(meTime.hours).padStart(2, '0');
            document.getElementById('me-minutes').textContent = String(meTime.minutes).padStart(2, '0');
            document.getElementById('me-seconds').textContent = String(meTime.seconds).padStart(2, '0');
        }
    }

    // Update Her
    if (herTime.isToday) {
        const container = document.getElementById('countdown-her-container');
        if (container) container.innerHTML = '<span class="script-font" style="font-size: 1.5rem; color: var(--rose);">Happy Birthday! 🎉</span>';
    } else {
        const d = document.getElementById('her-days');
        if (d) {
            d.textContent = herTime.days;
            document.getElementById('her-hours').textContent = String(herTime.hours).padStart(2, '0');
            document.getElementById('her-minutes').textContent = String(herTime.minutes).padStart(2, '0');
            document.getElementById('her-seconds').textContent = String(herTime.seconds).padStart(2, '0');
        }
    }
}
updateBirthdayCountdowns();
setInterval(updateBirthdayCountdowns, 1000);

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('active')));

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ===== FLOATING HEARTS =====
const heartsContainer = document.getElementById('floating-hearts');
const heartEmojis = ['💕', '💗', '💖', '💘', '❤️', '🩷', '✨'];
function createHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = 6 + Math.random() * 6 + 's';
    heart.style.animationDelay = Math.random() * 3 + 's';
    heart.style.fontSize = 0.8 + Math.random() * 1.2 + 'rem';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 14000);
}
setInterval(createHeart, 2000);
for (let i = 0; i < 5; i++) setTimeout(createHeart, i * 400);

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
let currentIndex = 0;
const images = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img').src,
    caption: item.dataset.caption
}));

galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => {
        currentIndex = i;
        openLightbox();
    });
});

function openLightbox() {
    lightboxImage.src = images[currentIndex].src;
    lightboxCaption.textContent = images[currentIndex].caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox();
});
document.getElementById('lightbox-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox();
});
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + images.length) % images.length; openLightbox(); }
    if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % images.length; openLightbox(); }
});

// ===== SECRET MESSAGE =====
document.getElementById('secret-btn').addEventListener('click', () => {
    const input = document.getElementById('secret-input').value.trim();
    const msg = document.getElementById('secret-message');
    if (input === '21102025' || input === '21-10-2025') {
        msg.classList.add('show');
    } else {
        const inp = document.getElementById('secret-input');
        inp.style.borderColor = '#e91e63';
        inp.style.animation = 'shake 0.4s ease';
        setTimeout(() => { inp.style.borderColor = ''; inp.style.animation = ''; }, 500);
    }
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== PARALLAX HERO =====
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight && heroContent) {
        heroContent.style.transform = `translateY(${scroll * 0.3}px)`;
        heroContent.style.opacity = 1 - (scroll / 600);
    }
});

// ===== 3D TILT EFFECT =====
const tiltCards = document.querySelectorAll('.profile-card, .favorite-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8; // Max 8 deg
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.setProperty('--rx', `${rotateX}deg`);
        card.style.setProperty('--ry', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
    });
});

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Use animate for smooth trailing effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    });

    const interactiveElements = document.querySelectorAll('a, button, input, .gallery-item, .profile-card, .favorite-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}
