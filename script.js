/* ============================================
   CAESAR IBRAHIM PORTFOLIO — SCRIPT
   Vanilla JS — no dependencies.
   ============================================ */
(function () {
  'use strict';

  /* ---------- 1. Mobile navigation ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  function closeNav() {
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleNav() {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', toggleNav);

    // Close menu after tapping a link (mobile)
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || hamburger.contains(e.target)) return;
      closeNav();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- 2. Active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = Array.from(navLinks)
    .map(function (link) {
      const id = link.getAttribute('href');
      return id && id.startsWith('#') ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function setActiveLink() {
    const scrollPos = window.scrollY + 120;
    let currentId = sections.length ? sections[0].id : null;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('active', isActive);
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- 3. Smooth scrolling (with sticky header offset) ---------- */
  const header = document.querySelector('.site-header');

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

      window.scrollTo({ top: top, behavior: 'smooth' });
      history.pushState(null, '', targetId);
    });
  });

  /* ---------- 4. Project category filter ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectEmpty = document.getElementById('projectEmpty');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      let visibleCount = 0;

      projectCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      if (projectEmpty) {
        projectEmpty.hidden = visibleCount !== 0;
      }
    });
  });

  /* ---------- 5. Testimonials slider ---------- */
  const testiTrack = document.getElementById('testiTrack');
  const testiDotsWrap = document.getElementById('testiDots');

  if (testiTrack && testiDotsWrap) {
    const slides = Array.from(testiTrack.children);
    let current = 0;
    let autoplayId = null;

    slides.forEach(function (_, index) {
      const dot = document.createElement('button');
      dot.classList.add('testi-dot');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (index + 1));
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', function () {
        goToSlide(index);
        restartAutoplay();
      });
      testiDotsWrap.appendChild(dot);
    });

    const dots = Array.from(testiDotsWrap.children);

    function goToSlide(index) {
      current = (index + slides.length) % slides.length;
      testiTrack.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    function nextSlide() { goToSlide(current + 1); }

    function startAutoplay() {
      autoplayId = window.setInterval(nextSlide, 6000);
    }

    function restartAutoplay() {
      if (autoplayId) window.clearInterval(autoplayId);
      startAutoplay();
    }

    // Swipe support (touch)
    let touchStartX = 0;
    testiTrack.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    testiTrack.addEventListener('touchend', function (e) {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) {
        delta < 0 ? nextSlide() : goToSlide(current - 1);
        restartAutoplay();
      }
    }, { passive: true });

    startAutoplay();
  }

  /* ---------- 6. Contact form validation ---------- */
  const contactForm = document.getElementById('contactForm');
  const contactMessage = document.getElementById('contactMessage');

  if (contactForm && contactMessage) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = document.getElementById('email');
      const email = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        contactMessage.textContent = 'Please enter a valid email address.';
        contactMessage.style.color = '#ff8a75';
        emailInput.focus();
        return;
      }

      contactMessage.textContent = 'Thanks! I\u2019ll get back to you soon.';
      contactMessage.style.color = '#FD6F00';
      contactForm.reset();
    });
  }

  /* ---------- 7. Scroll reveal (sections fade in once) ---------- */
  const revealTargets = document.querySelectorAll(
    '.about__inner, .service-card, .project-card, .testi-slider, .contact-form'
  );

  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) { observer.observe(el); });

    // Safety net: if an element is already in (or above) the viewport at
    // load time it may fire before layout settles, or not fire at all in
    // some embedding/testing contexts. Force-reveal anything still hidden
    // shortly after load so content is never permanently invisible.
    window.setTimeout(function () {
      revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
      observer.disconnect();
    }, 2000);
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

})();
