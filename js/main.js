// NeighbourGood Website — Main JavaScript
// Version: 1.1.0
// Theme toggle, copy-to-clipboard, scroll reveal, mobile nav,
// hero mesh-network animation, terminal boot-up, slideshow tilt

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    if (!prefersReducedMotion) {
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

  // --- Terminal Boot-Up (line-by-line reveal) ---
  if (!prefersReducedMotion) {
    document.querySelectorAll('[data-typewriter]').forEach(function (codeEl) {
      var lines = codeEl.innerHTML.split('\n');
      codeEl.innerHTML = lines.map(function (line, i) {
        return '<span class="code-line" style="--l:' + i + '">' + line + '</span>';
      }).join('\n');
      codeEl.classList.add('type-lines');
    });
  }

  // --- Hero Mesh Network Animation ---
  (function () {
    var canvas = document.querySelector('.mesh-canvas');
    if (!canvas || prefersReducedMotion || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var hero = canvas.parentElement;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    var nodes = [];
    var pulses = [];
    var LINK_DIST = 150;
    var running = true;
    var lastSpawn = 0;
    var lastFrame = 0;
    var colors = { line: '#4f46e5', node: '#4f46e5', hub: '#c95d1b', pulse: '#4f46e5' };

    function readColors() {
      var styles = getComputedStyle(document.documentElement);
      var primary = styles.getPropertyValue('--color-primary').trim() || '#4f46e5';
      var accent = styles.getPropertyValue('--color-accent').trim() || '#c95d1b';
      colors = { line: primary, node: primary, hub: accent, pulse: primary };
    }

    function resize() {
      var w = hero.offsetWidth;
      var h = hero.offsetHeight;
      // ignore tiny height changes (mobile browser chrome showing/hiding)
      if (w === W && Math.abs(h - H) < 80) return;
      W = w;
      H = h;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    }

    function initNodes() {
      nodes = [];
      pulses = [];
      var count = Math.min(40, Math.max(16, Math.round((W * H) / 26000)));
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: 1.6 + Math.random() * 1.4,
          hub: i % 9 === 0 // every ninth node is an accent "hub" (the neighbourhood Pi)
        });
      }
    }

    function neighboursOf(idx, exclude) {
      var out = [];
      for (var j = 0; j < nodes.length; j++) {
        if (j === idx || exclude.indexOf(j) !== -1) continue;
        var dx = nodes[j].x - nodes[idx].x;
        var dy = nodes[j].y - nodes[idx].y;
        if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) out.push(j);
      }
      return out;
    }

    // A pulse is a message hopping node-to-node through the mesh
    function spawnPulse() {
      if (!nodes.length) return;
      var start = Math.floor(Math.random() * nodes.length);
      var path = [start];
      for (var hop = 0; hop < 4; hop++) {
        var next = neighboursOf(path[path.length - 1], path);
        if (!next.length) break;
        path.push(next[Math.floor(Math.random() * next.length)]);
      }
      if (path.length > 1) {
        pulses.push({ path: path, seg: 0, t: 0 });
      }
    }

    function frame(now) {
      if (!running) return;
      requestAnimationFrame(frame);

      var dt = lastFrame ? Math.min(now - lastFrame, 34) : 16;
      lastFrame = now;
      ctx.clearRect(0, 0, W, H);

      var i, j, n;

      // drift
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        n.x += n.vx * dt * 0.048;
        n.y += n.vy * dt * 0.048;
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
      }

      // links
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.line;
      for (i = 0; i < nodes.length; i++) {
        for (j = i + 1; j < nodes.length; j++) {
          var dx = nodes[j].x - nodes[i].x;
          var dy = nodes[j].y - nodes[i].y;
          var d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            ctx.globalAlpha = 0.13 * (1 - Math.sqrt(d2) / LINK_DIST);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        ctx.globalAlpha = n.hub ? 0.75 : 0.4;
        ctx.fillStyle = n.hub ? colors.hub : colors.node;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hub ? n.r + 1.2 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // pulses hopping along the mesh
      if (now - lastSpawn > 1600 && pulses.length < 4) {
        spawnPulse();
        lastSpawn = now;
      }

      for (i = pulses.length - 1; i >= 0; i--) {
        var p = pulses[i];
        var a = nodes[p.path[p.seg]];
        var b = nodes[p.path[p.seg + 1]];
        p.t += dt / 850;
        if (p.t >= 1) {
          p.t = 0;
          p.seg++;
          if (p.seg >= p.path.length - 1) {
            pulses.splice(i, 1);
            continue;
          }
          a = nodes[p.path[p.seg]];
          b = nodes[p.path[p.seg + 1]];
        }
        var x = a.x + (b.x - a.x) * p.t;
        var y = a.y + (b.y - a.y) * p.t;

        // brighten the segment being travelled
        ctx.globalAlpha = 0.35;
        ctx.strokeStyle = colors.pulse;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        // glowing message dot
        var glow = ctx.createRadialGradient(x, y, 0, x, y, 9);
        glow.addColorStop(0, colors.pulse);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.95;
        ctx.fillStyle = colors.pulse;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    }

    function setRunning(active) {
      if (active && !running) {
        running = true;
        lastFrame = 0;
        requestAnimationFrame(frame);
      } else if (!active) {
        running = false;
      }
    }

    readColors();
    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(frame);

    // repaint with the right palette when the theme changes
    new MutationObserver(readColors).observe(html, { attributes: true, attributeFilter: ['data-theme'] });

    // pause when the hero is off-screen or the tab is hidden
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        setRunning(entries[0].isIntersecting && !document.hidden);
      }).observe(hero);
    }
    document.addEventListener('visibilitychange', function () {
      setRunning(!document.hidden);
    });
  })();

  // --- Slideshow 3D Tilt ---
  (function () {
    var frame = document.querySelector('.slideshow-frame[data-tilt]');
    if (!frame || prefersReducedMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    frame.addEventListener('mousemove', function (e) {
      var rect = frame.getBoundingClientRect();
      var rx = -((e.clientY - rect.top) / rect.height - 0.5) * 5;
      var ry = ((e.clientX - rect.left) / rect.width - 0.5) * 7;
      frame.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
    });

    frame.addEventListener('mouseleave', function () {
      frame.style.transform = '';
    });
  })();
})();
