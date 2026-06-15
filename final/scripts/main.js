import { loadStats, savePreference } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // Load impact stats dynamically
    const statsDiv = document.getElementById('impact-stats');
    if (statsDiv) {
        fetch('data/food-listings.json')
            .then(res => res.json())
            .then(data => {
                const totalItems = data.length;
                const restaurants = data.filter(i => i.type === 'Restaurant').length;
                statsDiv.innerHTML = `
                    <div class="stat">🍲 ${totalItems}+ meals shared</div>
                    <div class="stat">🏪 ${restaurants} restaurants participating</div>
                    <div class="stat">🌍 200kg waste diverted</div>
                `;
            })
            .catch(err => statsDiv.innerHTML = '<p>Stats unavailable</p>');
    }

    // Reset preferences link
    const resetBtn = document.getElementById('reset-prefs');
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            alert('Preferences reset');
        });
    }

    // Responsive navigation: hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const open = navMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }
});