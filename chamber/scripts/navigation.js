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