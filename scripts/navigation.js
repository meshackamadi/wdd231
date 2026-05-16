// Hamburger menu toggle for mobile
const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');

if (hamburgerBtn && primaryNav) {
  hamburgerBtn.addEventListener('click', () => {
    const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true' ? false : true;
    hamburgerBtn.setAttribute('aria-expanded', expanded);
    primaryNav.classList.toggle('show');
  });

  // Close menu when clicking a link on mobile
  const navLinks = primaryNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768 && primaryNav.classList.contains('show')) {
        primaryNav.classList.remove('show');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Active link highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navItems = document.querySelectorAll('#primaryNav a');
navItems.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});