/* ============================================
   TerraCraft Landscapes — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const body = document.body;

  function openMenu() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('show');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('show');
    body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  // Close on link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // --- Navbar scroll effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Intersection Observer Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el, index) => {
      el.style.transitionDelay = `${index % 3 * 0.1}s`;
      revealObserver.observe(el);
    });
  }

  // --- Portfolio Filters ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- Stat Counter Animation ---
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let current = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
          }, 20);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => countObserver.observe(el));
  }

  // --- Contact Form (basic) ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const origText = btn.textContent;
      btn.textContent = 'Message Sent! ✓';
      btn.style.background = 'var(--sage-dark)';
      setTimeout(() => {
        btn.textContent = origText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

});
