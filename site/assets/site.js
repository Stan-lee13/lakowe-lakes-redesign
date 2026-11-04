(() => {
  document.documentElement.classList.add('js-enabled');
  const header = document.querySelector('[data-site-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-primary-nav]');
  const body = document.body;

  const syncHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  const heroCarousel = document.querySelector('[data-hero-gallery]');
  if (heroCarousel) {
    const slides = [...heroCarousel.querySelectorAll('[data-hero-slide]')];
    const counter = heroCarousel.querySelector('[data-hero-current]');
    const caption = heroCarousel.querySelector('[data-hero-caption-text] span:first-child');
    const previous = heroCarousel.querySelector('[data-hero-prev]');
    const next = heroCarousel.querySelector('[data-hero-next]');
    const toggle = heroCarousel.querySelector('[data-hero-toggle]');
    let index = 0;
    let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pointerPaused = false;
    let focusPaused = false;
    let timer = null;

    const stop = () => { if (timer) window.clearInterval(timer); timer = null; };
    const start = () => {
      stop();
      if (paused || pointerPaused || focusPaused || document.hidden || slides.length < 2) return;
      timer = window.setInterval(() => move(1, false), 6500);
    };
    const render = () => {
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        slide.setAttribute('aria-label', `${i + 1} of ${slides.length}: ${slide.dataset.heroName}`);
      });
      const slide = slides[index];
      if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')} · ${slide.dataset.heroName}`;
      if (caption) caption.textContent = slide.dataset.heroCaption;
      if (toggle) {
        toggle.textContent = paused ? 'Play' : 'Pause';
        toggle.setAttribute('aria-label', paused ? 'Play image rotation' : 'Pause image rotation');
      }
    };
    const move = (amount, restart = true) => {
      index = (index + amount + slides.length) % slides.length;
      render();
      if (restart) start();
    };

    if (previous) previous.addEventListener('click', () => move(-1));
    if (next) next.addEventListener('click', () => move(1));
    if (toggle) toggle.addEventListener('click', () => { paused = !paused; render(); start(); });
    heroCarousel.addEventListener('pointerenter', () => { pointerPaused = true; stop(); });
    heroCarousel.addEventListener('pointerleave', () => { pointerPaused = false; start(); });
    heroCarousel.addEventListener('focusin', () => { focusPaused = true; stop(); });
    heroCarousel.addEventListener('focusout', event => {
      if (!heroCarousel.contains(event.relatedTarget)) { focusPaused = false; start(); }
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
    render();
    start();
  }

  if (menuButton && nav) {
    const closeMenu = (returnFocus = false) => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
      body.classList.remove('menu-open');
      if (returnFocus) menuButton.focus();
    };
    menuButton.addEventListener('click', () => {
      const opening = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(opening));
      menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', opening);
      body.classList.toggle('menu-open', opening);
      if (opening) {
        const firstLink = nav.querySelector('a');
        if (firstLink && window.matchMedia('(max-width: 760px)').matches) firstLink.focus({ preventScroll: true });
      }
    });
    nav.addEventListener('click', event => {
      if (event.target === nav || event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    window.addEventListener('resize', () => {
      if (!window.matchMedia('(max-width: 760px)').matches) closeMenu();
    });
  }

  const tabGroups = document.querySelectorAll('[data-story-tabs]');
  tabGroups.forEach(group => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const panels = [...document.querySelectorAll('[data-story-panel]')];
    const activate = tab => {
      const key = tab.dataset.storyTab;
      tabs.forEach(item => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });
      panels.forEach(panel => {
        const active = panel.dataset.storyPanel === key;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        let next = null;
        if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
        if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
        if (event.key === 'Home') next = tabs[0];
        if (event.key === 'End') next = tabs[tabs.length - 1];
        if (next) {
          event.preventDefault();
          activate(next);
          next.focus();
        }
      });
    });
  });

  document.querySelectorAll('[data-rail-control]').forEach(button => {
    button.addEventListener('click', () => {
      const rail = document.getElementById(button.dataset.railTarget);
      if (!rail) return;
      const direction = button.dataset.railControl === 'next' ? 1 : -1;
      rail.scrollBy({ left: direction * Math.max(260, rail.clientWidth * .78), behavior: 'smooth' });
    });
  });

  const dialog = document.querySelector('[data-lightbox-dialog]');
  if (dialog) {
    const view = dialog.querySelector('img');
    const caption = dialog.querySelector('[data-lightbox-caption]');
    const closeButton = dialog.querySelector('[data-lightbox-close]');
    document.querySelectorAll('[data-lightbox]').forEach(button => {
      button.addEventListener('click', () => {
        const image = button.querySelector('img');
        if (!image) return;
        view.src = image.currentSrc || image.src;
        view.alt = image.alt;
        const label = button.dataset.caption || button.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
        if (caption) caption.textContent = label;
        dialog.showModal();
      });
    });
    if (closeButton) closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => { view.removeAttribute('src'); });
  }

  const revealTargets = document.querySelectorAll('[data-reveal]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .14, rootMargin: '0px 0px -3% 0px' });
    revealTargets.forEach(target => observer.observe(target));
  } else {
    revealTargets.forEach(target => target.classList.add('is-visible'));
  }
})();
