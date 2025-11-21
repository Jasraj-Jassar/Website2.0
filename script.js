const body = document.body;
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const storedTheme = localStorage.getItem('jj-theme');
if (storedTheme === 'light' || (!storedTheme && prefersLight)) {
  body.dataset.theme = 'light';
}

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = body.dataset.theme === 'light';
    if (isLight) {
      body.removeAttribute('data-theme');
      localStorage.removeItem('jj-theme');
    } else {
      body.dataset.theme = 'light';
      localStorage.setItem('jj-theme', 'light');
    }
  });
}

const header = document.querySelector('.site-header');
const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 24);
};
window.addEventListener('scroll', updateHeader);
updateHeader();

const animatedBlocks = document.querySelectorAll('[data-animate]');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);
animatedBlocks.forEach((block) => revealObserver.observe(block));

const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = link.getAttribute('href');
    if (!target || target === '#') return;
    const section = document.querySelector(target);
    if (!section) return;
    event.preventDefault();
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const status = document.createElement('p');
  status.className = 'form-status';
  status.setAttribute('role', 'status');
  contactForm.appendChild(status);

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const nameEntry = formData.get('name');
    const displayName =
      nameEntry && String(nameEntry).trim().length ? String(nameEntry).trim() : 'there';
    status.textContent = `Thanks ${displayName}! I'll follow up within two business days.`;
    status.classList.add('success');
    contactForm.reset();
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

