// NeighbourGood Website — Main JavaScript
// Theme toggle, copy-to-clipboard, scroll reveal, mobile nav

(function () {
  'use strict';

  // --- Theme Toggle ---
  const html = document.documentElement;
  const themeBtn = document.querySelector('.theme-toggle');
  const themeIcon = themeBtn ? themeBtn.querySelector('.theme-icon') : null;

  function getPreferredTheme() {
    const stored = localStorage.getItem('ng-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('ng-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '\u263E' : '\u2606';
    }
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  setTheme(getPreferredTheme());

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // --- Copy to Clipboard ---
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var codeEl = document.getElementById(targetId);
      if (!codeEl) return;

      var text = codeEl.textContent
        .replace(/^\$ /gm, '')
        .replace(/^# .+$/gm, '')
        .replace(/\n{2,}/g, '\n')
        .trim();

      navigator.clipboard.writeText(text).then(function () {
        btn.classList.add('copied');
        var span = btn.querySelector('span');
        if (span) {
          var original = span.textContent;
          span.textContent = 'Copied!';
          setTimeout(function () {
            span.textContent = original;
            btn.classList.remove('copied');
          }, 2000);
        }
      });
    });
  });

  // --- Scroll Reveal ---
  if ('IntersectionObserver' in window) {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  // --- Sticky Nav Scroll Effect ---
  var nav = document.querySelector('.main-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- Mobile Hamburger Menu ---
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
