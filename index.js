// Mobile menu toggle
const toggleBtn = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

if (toggleBtn && nav) {
  toggleBtn.addEventListener('click', () => {
    const open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    toggleBtn.setAttribute('aria-expanded', String(!open));
  });

  // Close menu after clicking a link or the Login button
  nav.addEventListener('click', (e) => {
    const isLink = e.target.closest('a, button');
    if (isLink && nav.getAttribute('data-open') === 'true') {
      nav.setAttribute('data-open', 'false');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    const clickedInside = e.target.closest('.navigation, .nav-toggle');
    if (!clickedInside && nav.getAttribute('data-open') === 'true') {
      nav.setAttribute('data-open', 'false');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}
