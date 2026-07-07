// NeighbourGood Website — Main JavaScript
// Version: 1.0.0
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
      themeIcon.textContent = theme === 'dark' ? '\u263E' : '\u263C';
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
      }).catch(function () {
        // Clipboard API unavailable or permission denied — silently ignore
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

  // --- Screenshot Slideshow ---
  document.querySelectorAll('[data-slideshow]').forEach(function (slideshow) {
    var track = slideshow.querySelector('.slideshow-track');
    var slides = Array.prototype.slice.call(slideshow.querySelectorAll('.slideshow-slide'));
    var dots = Array.prototype.slice.call(slideshow.querySelectorAll('.slideshow-dot'));
    var titleEl = slideshow.querySelector('[data-slide-title]');
    var descEl = slideshow.querySelector('[data-slide-desc]');
    var prevBtn = slideshow.querySelector('.slideshow-prev');
    var nextBtn = slideshow.querySelector('.slideshow-next');
    var index = 0;
    var autoplayDelay = 5000;
    var autoplayTimer = null;

    function render() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === index);
      });
      var slide = slides[index];
      if (slide && titleEl && descEl) {
        titleEl.textContent = slide.getAttribute('data-title');
        descEl.innerHTML = slide.getAttribute('data-desc');
      }
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
    }

    function restartAutoplay() {
      if (autoplayTimer) clearTimeout(autoplayTimer);
      autoplayTimer = setTimeout(function () {
        goTo(index + 1);
        restartAutoplay();
      }, autoplayDelay);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(index - 1);
        restartAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(index + 1);
        restartAutoplay();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        restartAutoplay();
      });
    });

    if (slides.length > 1) {
      render();
      restartAutoplay();
    }
  });

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
