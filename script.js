document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileBtn.classList.toggle('active');
    });
  }

  // Dropdown toggle for mobile
  const dropdowns = document.querySelectorAll('.dropdown > a');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.parentElement.classList.toggle('active');
      }
    });
  });

  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
  });

  // Language Toggle Logic
  const langBtns = document.querySelectorAll('.lang-toggle');
  let currentLang = localStorage.getItem('rcv_lang') || 'en';

  window.applyTranslations = function(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (window.translations && window.translations[lang] && window.translations[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = window.translations[lang][key];
        } else {
          el.innerHTML = window.translations[lang][key];
        }
      }
    });

    langBtns.forEach(btn => {
      btn.textContent = lang === 'en' ? 'PT' : 'EN';
    });

    document.documentElement.lang = lang;
    localStorage.setItem('rcv_lang', lang);
  }

  if (window.translations) {
    applyTranslations(currentLang);
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      currentLang = currentLang === 'en' ? 'pt' : 'en';
      applyTranslations(currentLang);
    });
  });

});
