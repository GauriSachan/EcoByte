/* =================================================
   script.js
   All interactive behaviors: counters, menus,
   diagnostic simulation, testimonials, accordion,
   newsletter, cart toast, and small helpers.
   ================================================= */

document.addEventListener('DOMContentLoaded', function () {
  // NAV TOGGLE
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle && navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      mobileMenu.style.transform = 'translateY(0%)';
      mobileMenu.setAttribute('aria-hidden', 'false');
    } else {
      mobileMenu.style.transform = 'translateY(-120%)';
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });

  // THEME TOGGLE
  const themeToggle = document.getElementById('themeToggle');
  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.setAttribute('aria-pressed', String(!isDark));
    // small visual feedback
    themeToggle.animate([{transform:'scale(1)'},{transform:'scale(1.08)'},{transform:'scale(1)'}],{duration:380});
  });

  // PRESET: prefer dark if user prefers
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme','dark');
  }

  // COUNTERS
  const counters = Array.from(document.querySelectorAll('.stat-num'));
  function animateCounters() {
    counters.forEach(el => {
      const target = +el.getAttribute('data-target') || 0;
      const duration = 1400;
      let start = 0;
      const step = Math.ceil(target / (duration / 40));
      const interval = setInterval(() => {
        start += step;
        if (start >= target) {
          el.textContent = target.toLocaleString();
          clearInterval(interval);
        } else {
          el.textContent = start.toLocaleString();
        }
      }, 40);
    });
  }
  // animate when hero in view
  const hero = document.querySelector('.hero');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounters(); io.disconnect(); }
    });
  }, {threshold:0.3});
  hero && io.observe(hero);

  // ADD TO CART (toast)
  window.addToCart = function (itemName) {
    const toast = document.getElementById('cartToast');
    toast.textContent = `${itemName} added to cart ✓`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(30px)';
    }, 2200);
  };

  // DIAGNOSTIC Simulation
  window.runDiagnostic = function () {
    const input = document.getElementById('diagnoseFile');
    if (!input || !input.files || !input.files.length) {
      alert('Please select a short video clip (5-30s) for diagnostic');
      return;
    }
    const dialog = confirm('Run quick local diagnostic? This will simulate an AI inference locally.');
    if (!dialog) return;

    // Fake progress
    let p = 0;
    const original = document.querySelector('.diagnose-row button');
    original.disabled = true; original.textContent = 'Analyzing...';

    const i = setInterval(() => {
      p += Math.floor(Math.random()*18) + 8;
      if (p >= 100) p = 100;
      original.textContent = `Analyzing ${p}%`;
      if (p >= 100) {
        clearInterval(i);
        original.disabled = false;
        original.textContent = 'Run Diagnostic';
        // show a custom dialog / result
        const repair = Math.floor(Math.random()*30) + 60; // 60-90
        const recycle = Math.floor(Math.random()*20) + 78; // 78-98
        alert(`AI Diagnostic Complete\nRepairability: ${repair}%\nRecyclability: ${recycle}%`);
      }
    }, 420);
  };

  // TESTIMONIAL CAROUSEL
  let tIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  function showTestimonial(idx) {
    testimonials.forEach((t,i)=> t.classList.toggle('active', i === idx));
  }
  window.nextTestimonial = function () { tIndex = (tIndex+1) % testimonials.length; showTestimonial(tIndex); }
  window.prevTestimonial = function () { tIndex = (tIndex-1 + testimonials.length) % testimonials.length; showTestimonial(tIndex); }
  // auto rotate
  setInterval(() => { nextTestimonial(); }, 8000);

  // ACCORDION FAQ
  const accBtns = document.querySelectorAll('.acc-btn');
  accBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const open = panel.style.maxHeight && panel.style.maxHeight !== '0px';
      // close all
      document.querySelectorAll('.acc-panel').forEach(p => p.style.maxHeight = null);
      if (!open) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else panel.style.maxHeight = null;
    });
  });

  // NEWSLETTER SUBMIT
  const newsletter = document.getElementById('newsletterForm');
  const newsletterMsg = document.getElementById('newsletterMsg');
  newsletter && newsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    newsletterMsg.textContent = 'Subscribing...';
    setTimeout(() => {
      newsletterMsg.textContent = `Thanks — ${email} subscribed! Check your inbox.`;
      newsletter.reset();
    }, 1100);
  });

  // SEARCH button quick demo
  const searchBtn = document.getElementById('searchBtn');
  const navSearch = document.getElementById('navSearch');
  searchBtn && searchBtn.addEventListener('click', () => {
    const q = (navSearch && navSearch.value) ? navSearch.value.trim() : '';
    if (!q) { alert('Try searching for "battery", "phone", or "scrap kit"'); return; }
    alert(`Search feature demo — query: "${q}" (no backend in demo)`);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior:'smooth',block:'start'});
        // Close mobile menu if open
        if (mobileMenu && navToggle.getAttribute('aria-expanded') === 'true') {
          navToggle.click();
        }
      }
    });
  });

  // Accessibility: close mobile menu on outside click
  document.addEventListener('click', (ev) => {
    if (!mobileMenu || !navToggle) return;
    if (navToggle.getAttribute('aria-expanded') === 'true' && !mobileMenu.contains(ev.target) && !navToggle.contains(ev.target)) {
      navToggle.click();
    }
  });

  // Tiny local storage for theme persist
  if (localStorage.getItem('ecocycle-theme')) {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('ecocycle-theme'));
  }
  document.documentElement.addEventListener('data-theme-change', (e)=> {
    localStorage.setItem('ecocycle-theme', document.documentElement.getAttribute('data-theme'));
  });
  // hook to save when toggled:
  themeToggle && themeToggle.addEventListener('click', () => {
    localStorage.setItem('ecocycle-theme', document.documentElement.getAttribute('data-theme'));
  });
});

/* Optional: allow programmatic theme set */
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.dispatchEvent(new Event('data-theme-change'));
}

/* Small utilities (exposed) */
window.setTheme = setTheme;
