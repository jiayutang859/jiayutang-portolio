/* ===== NAVIGATION ===== */
const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks  = document.querySelectorAll('.nav-links a, .mobile-menu a[href^="#"]');

// Scroll shadow on navbar
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.classList.toggle('active', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');

const observerOpts = { rootMargin: '-40% 0px -55% 0px', threshold: 0 };

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
    });
  });
}, observerOpts);

sections.forEach(s => navObserver.observe(s));

/* ===== BACK TO TOP ===== */
const backTop = document.getElementById('backTop');

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll(
  '.research-card, .pub-card, .edu-card, .tool-group, .stat-block'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ===== SMOOTH SCROLL for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = navbar.offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
