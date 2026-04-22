/* ===== CODEMASTERS CONFERENCE 2026 — SCRIPT.JS ===== */

/* ─── Nav: Hamburger ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ─── Scroll-reveal ─────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ─── Hero Particles ────────────────────────────────── */
  const container = document.querySelector('.hero-particles');
  if (container) {
    const colors = ['#93c5fd', '#c4b5fd', '#67e8f9', '#a5b4fc', '#fbcfe8'];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 5 + 2;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        animation-duration:${Math.random()*12+8}s;
        animation-delay:${Math.random()*8}s;
        filter:blur(${Math.random()>.5?1:0}px);
      `;
      container.appendChild(p);
    }
  }

  /* ─── "Register Now" Hero button ──────────────────────── */
  const registerBtn = document.getElementById('hero-register-btn');
  if (registerBtn) {
    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('🎉 Redirecting you to registration!', 'success');
      setTimeout(() => window.location.href = 'register.html', 1200);
    });
  }

  /* ─── Contact Form ──────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const msg = document.getElementById('c-message').value.trim();
      if (!name || !email || !msg) {
        showAlert('contact-alert', 'Please fill in all fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showAlert('contact-alert', 'Please enter a valid email address.', 'error');
        return;
      }
      showAlert('contact-alert', `✅ Thanks, ${name}! Your message has been sent. We'll reply within 24 hours.`, 'success');
      contactForm.reset();
    });
  }

  /* ─── Login Form ────────────────────────────────────── */
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('l-email').value.trim();
      const pass  = document.getElementById('l-password').value;
      if (!email || !pass) {
        showAlert('login-alert', 'Please enter your email and password.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showAlert('login-alert', 'Please enter a valid email address.', 'error');
        return;
      }
      showAlert('login-alert', '✅ Login successful! Welcome back.', 'success');
      setTimeout(() => window.location.href = 'index.html', 1500);
    });
  }

  /* ─── Register Form ─────────────────────────────────── */
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    const passInput = document.getElementById('r-password');
    if (passInput) {
      passInput.addEventListener('input', () => {
        updateStrength(passInput.value);
      });
    }
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name  = document.getElementById('r-name').value.trim();
      const email = document.getElementById('r-email').value.trim();
      const pass  = document.getElementById('r-password').value;
      const agree = document.getElementById('r-agree').checked;
      if (!name || !email || !pass) {
        showAlert('register-alert', 'Please fill in all required fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showAlert('register-alert', 'Please enter a valid email address.', 'error');
        return;
      }
      if (pass.length < 8) {
        showAlert('register-alert', 'Password must be at least 8 characters long.', 'error');
        return;
      }
      if (!agree) {
        showAlert('register-alert', 'Please agree to the Terms & Privacy Policy.', 'error');
        return;
      }
      showAlert('register-alert', `🎉 Registration successful! Welcome, ${name}!`, 'success');
      registerForm.reset();
      resetStrength();
    });
  }

  /* ─── Countdown Timer (Home) ────────────────────────── */
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const target = new Date('2026-09-15T09:00:00');
    function updateTimer() {
      const now  = new Date();
      const diff = target - now;
      if (diff <= 0) {
        countdownEl.textContent = '🚀 Conference is LIVE!';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000)  / 60000);
      const s = Math.floor((diff % 60000)    / 1000);
      document.getElementById('cd-days').textContent  = String(d).padStart(2,'0');
      document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
      document.getElementById('cd-mins').textContent  = String(m).padStart(2,'0');
      document.getElementById('cd-secs').textContent  = String(s).padStart(2,'0');
    }
    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* ─── Active nav link ───────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});

/* ─── Helpers ─────────────────────────────────────────── */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(id, message, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.className = `alert alert-${type} show`;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  if (type === 'success') {
    setTimeout(() => el.classList.remove('show'), 5000);
  }
}

function showToast(message, type = 'success') {
  const t = document.createElement('div');
  t.textContent = message;
  t.style.cssText = `
    position:fixed; bottom:2rem; right:2rem; z-index:9999;
    padding:.9rem 1.5rem; border-radius:10px;
    background:${type === 'success' ? '#d1fae5' : '#fee2e2'};
    color:${type === 'success' ? '#065f46' : '#991b1b'};
    border:1px solid ${type === 'success' ? '#a7f3d0' : '#fca5a5'};
    font-size:.93rem; font-weight:600; font-family:'DM Sans',sans-serif;
    box-shadow:0 8px 28px rgba(0,0,0,.12);
    animation:fadeIn .3s ease;
  `;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function updateStrength(value) {
  const bars = document.querySelectorAll('.strength-bar span');
  if (!bars.length) return;
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  const colors = ['#ef4444','#f97316','#eab308','#22c55e'];
  bars.forEach((bar, i) => {
    bar.style.background = i < score ? colors[score - 1] : 'var(--border)';
  });
}

function resetStrength() {
  document.querySelectorAll('.strength-bar span').forEach(b => b.style.background = 'var(--border)');
}
