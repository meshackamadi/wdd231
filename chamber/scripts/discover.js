import { attractionsData } from '../data/attractions.mjs';

// Function to calculate days between two dates
function getDaysDifference(previousDate, currentDate) {
  const diffTime = Math.abs(currentDate - previousDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Function to handle visitor message using localStorage
function displayVisitorMessage() {
  const messageContainer = document.getElementById('visitorMessage');
  if (!messageContainer) return;
  
  const currentVisit = Date.now();
  const lastVisit = localStorage.getItem('lastDiscoverVisit');
  let messageText = '';
  
  if (!lastVisit) {
    // First visit
    messageText = '👋 Welcome! Let us know if you have any questions about the chamber or local attractions.';
  } else {
    const lastVisitDate = parseInt(lastVisit, 10);
    const daysDifference = getDaysDifference(lastVisitDate, currentVisit);
    
    if (daysDifference < 1) {
      messageText = '✨ Back so soon! Awesome! Check out our latest tech district updates.';
    } else {
      const dayText = daysDifference === 1 ? 'day' : 'days';
      messageText = `📅 You last visited ${daysDifference} ${dayText} ago. Explore what's new in the gadget corridor!`;
    }
  }
  
  // Update the message
  const messageSpan = messageContainer.querySelector('.message-text');
  if (messageSpan) {
    messageSpan.textContent = messageText;
  }
  
  // Store current visit date
  localStorage.setItem('lastDiscoverVisit', currentVisit.toString());
}

// Function to create attraction cards
function createAttractionCard(attraction, index) {
  const card = document.createElement('div');
  card.className = `attraction-card card-${attraction.id}`;
  
  // Create card content
  card.innerHTML = `
    <h2>${escapeHtml(attraction.name)}</h2>
    <figure>
      <img src="${attraction.image}" alt="${escapeHtml(attraction.imageAlt)}" loading="lazy" width="600" height="400">
    </figure>
    <address>${escapeHtml(attraction.address)}</address>
    <p class="description">${escapeHtml(attraction.description)}</p>
    <button class="learn-btn" data-id="${attraction.id}">Learn More →</button>
  `;
  
  // Add event listener to the button
  const learnBtn = card.querySelector('.learn-btn');
  learnBtn.addEventListener('click', () => {
    showLearnMoreModal(attraction);
  });
  
  return card;
}

// Modal functionality for "Learn More" buttons
function showLearnMoreModal(attraction) {
  // Check if modal already exists
  let modal = document.getElementById('discoverModal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'discoverModal';
    modal.className = 'modal discover-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3 id="modalTitle"></h3>
        <img id="modalImage" src="" alt="">
        <p id="modalAddress"></p>
        <p id="modalDescription"></p>
        <button class="modal-close-btn">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add styles for modal if not present
    if (!document.querySelector('#modalStyles')) {
      const style = document.createElement('style');
      style.id = 'modalStyles';
      style.textContent = `
        .discover-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          z-index: 2000;
          justify-content: center;
          align-items: center;
        }
        .discover-modal.active {
          display: flex;
          animation: fadeIn 0.3s ease;
        }
        .discover-modal .modal-content {
          background: white;
          max-width: 550px;
          width: 90%;
          border-radius: 24px;
          padding: 1.8rem;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        .discover-modal .close-modal {
          position: absolute;
          top: 1rem;
          right: 1.2rem;
          font-size: 1.8rem;
          cursor: pointer;
          color: var(--text-muted);
        }
        .discover-modal .modal-close-btn {
          margin-top: 1.5rem;
          padding: 0.7rem 1.5rem;
          background: var(--primary-dark);
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
        }
        #modalImage { width: 100%; border-radius: 12px; margin: 1rem 0; }
        #modalAddress { color: var(--primary-accent); margin: 0.5rem 0; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add event listeners to close modal
    const closeBtn = modal.querySelector('.close-modal');
    const closeActionBtn = modal.querySelector('.modal-close-btn');
    const closeModal = () => modal.classList.remove('active');
    
    closeBtn.addEventListener('click', closeModal);
    closeActionBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  
  // Populate modal with attraction data
  modal.querySelector('#modalTitle').textContent = attraction.name;
  modal.querySelector('#modalImage').src = attraction.image;
  modal.querySelector('#modalImage').alt = attraction.imageAlt;
  modal.querySelector('#modalAddress').innerHTML = `📍 ${escapeHtml(attraction.address)}`;
  modal.querySelector('#modalDescription').textContent = attraction.description;
  
  modal.classList.add('active');
}

// Helper function to escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Function to render all attraction cards
function renderAttractions() {
  const container = document.getElementById('attractionsGrid');
  if (!container) return;
  
  container.innerHTML = '';
  
  attractionsData.forEach((attraction, idx) => {
    const card = createAttractionCard(attraction, idx);
    container.appendChild(card);
  });
}

// Close message functionality
function setupMessageDismiss() {
  const closeBtn = document.getElementById('closeMessageBtn');
  const messageContainer = document.getElementById('visitorMessage');
  
  if (closeBtn && messageContainer) {
    closeBtn.addEventListener('click', () => {
      messageContainer.style.display = 'none';
      // Store that user dismissed the message (optional)
      localStorage.setItem('messageDismissed', 'true');
    });
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderAttractions();
  displayVisitorMessage();
  setupMessageDismiss();
});