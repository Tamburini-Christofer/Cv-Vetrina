// Typewriter effect
const text = 'Junior Frontend Developer';
const typewriterEl = document.getElementById('typewriter');

let i = 0;

function typeWriter() {
  if (!typewriterEl) {
    return;
  }

  if (i < text.length) {
    typewriterEl.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 70);
  }
}

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.textContent = isOpen ? '✕' : '☰';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    });
  });
}

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
);

revealElements.forEach((el) => revealObserver.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section, header');
const navAnchors = document.querySelectorAll('.nav-links a');

const observerOptions = { rootMargin: '-40% 0px -55% 0px', threshold: 0 };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach((anchor) => {
        const href = anchor.getAttribute('href') || '';
        const anchorHash = href.includes('#') ? `#${href.split('#')[1]}` : '';
        anchor.classList.toggle('active', anchorHash === `#${id}`);
      });
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

// Navbar shrink on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (!nav) {
    return;
  }

  const currentScroll = window.scrollY;
  if (currentScroll > 60) {
    nav.style.padding = '0.7rem 0';
    nav.style.background = 'rgba(15, 12, 29, 0.9)';
  } else {
    nav.style.padding = '1rem 0';
    nav.style.background = 'rgba(15, 12, 29, 0.75)';
  }
});

// Start animations after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeWriter, 400);

  const feedbackForm = document.getElementById('feedback-form');
  if (!feedbackForm) {
    return;
  }

  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('feedback-name')?.value?.trim() || 'Anonimo';
    const email = document.getElementById('feedback-email')?.value?.trim() || 'Non fornita';
    const message = document.getElementById('feedback-message')?.value?.trim();

    if (!message) {
      return;
    }

    const subject = encodeURIComponent('Nuovo feedback dal CV vetrina');
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nCommento:\n${message}`);
    window.location.href = `mailto:christofer.tamburini92@gmail.com?subject=${subject}&body=${body}`;
  });
});
