// app.js — tiny hash router (no server rewrites needed)
(() => {
  const sections = Array.from(document.querySelectorAll('[data-route]'));
  const routes = sections.map(s => s.dataset.route); // e.g., "/bio"
  const nav = document.getElementById('site-nav');
  const toggleBtn = document.querySelector('.nav-toggle');

  const toPath = () => {
    const hash = location.hash || '#/home';
    // normalize "#/bio" -> "/bio"
    const path = hash.startsWith('#') ? hash.slice(1) : '/home';
    return routes.includes(path) ? path : '/404';
  };

  const showOnly = (el) => sections.forEach(s => s.classList.toggle('is-hidden', s !== el));
  const setActive = (path) => {
    if (!nav) return;
    nav.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href') || '';
      const hrefPath = href.startsWith('#') ? href.slice(1) : href; // "#/bio" -> "/bio"
      a.classList.toggle('active', hrefPath === path);
    });
  };

  const updateTitle = (el) => {
    const h = el.querySelector('h1,h2,h3');
    document.title = `${h?.textContent?.trim() || 'Spirit Path'} • Spirit Path`;
  };

  const render = () => {
    const path = toPath();
    let target = sections.find(s => s.dataset.route === path)
            || sections.find(s => s.dataset.route === '/404')
            || sections[0];
    showOnly(target);
    setActive(path);
    updateTitle(target);
    if (nav?.getAttribute('data-open') === 'true') {
      nav.setAttribute('data-open', 'false');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('hashchange', render);
  render();
})();
