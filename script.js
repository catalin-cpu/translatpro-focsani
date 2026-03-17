/* TranslatPro Focșani — main.js */

/* ─── Navbar scroll effect ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ─── Mobile nav toggle ─── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!isOpen));
  navMenu.classList.toggle('open');
  document.body.classList.toggle('nav-open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

/* ─── Smooth scroll for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navHeight = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── Fade-in on scroll (IntersectionObserver) ─── */
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
fadeEls.forEach(el => observer.observe(el));

/* ─── Contact form ─── */
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-message');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    const name  = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const msg   = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !msg) {
      showFormMessage('Vă rugăm completați câmpurile obligatorii (Nume, Email, Mesaj).', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormMessage('Adresa de email introdusă nu este validă.', 'error');
      return;
    }

    // Simulate send
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Se trimite…';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Trimite solicitarea';
      showFormMessage('Mulțumim! Solicitarea dvs. a fost primită. Vă vom contacta în cel mai scurt timp.', 'success');
    }, 1200);
  });
}

function showFormMessage(text, type) {
  if (!formMsg) return;
  formMsg.textContent = text;
  formMsg.className = 'form-message ' + type;
  formMsg.style.display = 'block';
  setTimeout(() => { formMsg.style.display = 'none'; }, 6000);
}

/* ─── Current year in footer ─── */
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
