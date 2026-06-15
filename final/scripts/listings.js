import { openModal } from './modal.js';
import { savePreference, getPreference } from './storage.js';

let allListings = [];

async function loadListings() {
    try {
        const response = await fetch('data/food-listings.json');
        if (!response.ok) throw new Error('HTTP error');
        allListings = await response.json();
        renderListings(allListings);
    } catch (error) {
        document.getElementById('listings-container').innerHTML = '<p>Failed to load listings. Try again later.</p>';
        console.error(error);
    }
}

function renderListings(listings) {
    const container = document.getElementById('listings-container');
    if (!container) return;
    
    if (listings.length === 0) {
        container.innerHTML = '<p>No food available right now. Check back soon!</p>';
        return;
    }

    // Use map and template literals
    container.innerHTML = listings.map(item => {
        const img = item.image ? `images/${item.image}` : 'images/listing-thumb.svg';
        const typeBadge = `<span class="badge">${item.type}</span>`;
        return `
        <article class="card" data-id="${item.id}" aria-labelledby="title-${item.id}">
            <img src="${img}" alt="${item.title}" loading="lazy" width="300" height="200">
            <div class="card-body">
                <h3 id="title-${item.id}">${item.title} ${typeBadge}</h3>
                <p class="muted">${item.description}</p>
                <p><strong>Pickup:</strong> ${item.location} &middot; <strong>Donor:</strong> ${item.donor}</p>
                <p class="muted"><strong>Expires:</strong> ${item.expires}</p>
                <div class="card-actions"><button class="claim-btn" data-id="${item.id}">More Info</button></div>
            </div>
        </article>
    `}).join('');

    // Attach event listeners to each button
    document.querySelectorAll('.claim-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            const food = allListings.find(f => f.id === id);
            if (food) openModal(food);
        });
    });
}

// Filtering using array filter method
function filterListings(type) {
    if (type === 'all') renderListings(allListings);
    else renderListings(allListings.filter(item => item.type === type));
}

// Search listings by term in title, description, donor, or location
function searchListings(term) {
    const q = term.trim().toLowerCase();
    if (!q) { renderListings(allListings); return; }
    const results = allListings.filter(item => {
        return [item.title, item.description, item.donor, item.location]
            .join(' ').toLowerCase().includes(q);
    });
    renderListings(results);
}

document.addEventListener('DOMContentLoaded', () => {
    loadListings();
    
    document.getElementById('filter-all')?.addEventListener('click', () => filterListings('all'));
    document.getElementById('filter-household')?.addEventListener('click', () => filterListings('Household'));
    document.getElementById('filter-restaurant')?.addEventListener('click', () => filterListings('Restaurant'));
    // Search input
    const searchInput = document.getElementById('search-listings');
    if (searchInput) {
        let timeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => searchListings(e.target.value), 250);
        });
    }
    
    // Load user's last filter from localStorage
    const lastFilter = getPreference('lastFilter');
    if (lastFilter && lastFilter !== 'all') filterListings(lastFilter);
    
    // Save filter preference
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterType = e.target.innerText === 'All' ? 'all' : e.target.innerText;
            savePreference('lastFilter', filterType);
            // update aria-pressed state
            document.querySelectorAll('.filter-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
            e.target.setAttribute('aria-pressed', 'true');
        });
    });
});