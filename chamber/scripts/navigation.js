// Responsive Navigation Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');

if (hamburgerBtn && primaryNav) {
  hamburgerBtn.addEventListener('click', () => {
    const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true' ? false : true;
    hamburgerBtn.setAttribute('aria-expanded', expanded);
    primaryNav.classList.toggle('show');
  });
}

// Set active nav link based on current page
function setActiveNav() {
  const links = document.querySelectorAll('#primaryNav a');
  if (!links || links.length === 0) return;
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === current) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    } else {
      a.classList.remove('active');
      a.removeAttribute('aria-current');
    }
  });
}

// Run on deferred load
setActiveNav();