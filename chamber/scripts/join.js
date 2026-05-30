// Join page functionality - Modals, timestamp, and form handling

// Set timestamp hidden field when page loads
document.addEventListener('DOMContentLoaded', function() {
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    const now = new Date();
    timestampField.value = now.toLocaleString();
  }
  
  // Modal functionality
  const modal = document.getElementById('benefitModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBenefits = document.getElementById('modalBenefits');
  const closeModalBtn = document.querySelector('.close-modal');
  
  // Benefits data
  const benefitsData = {
    np: {
      title: 'NP Membership (Non-Profit)',
      benefits: [
        '✓ No membership fee',
        '✓ Basic directory listing',
        '✓ Access to monthly networking events',
        '✓ Quarterly newsletter feature',
        '✓ Member pricing for training workshops'
      ]
    },
    bronze: {
      title: 'Bronze Membership',
      benefits: [
        '✓ Low annual fee',
        '✓ Enhanced directory listing with logo',
        '✓ Priority event registration',
        '✓ 2 social media mentions per year',
        '✓ Discounted training & webinars (15% off)',
        '✓ Access to member-only forums'
      ]
    },
    silver: {
      title: 'Silver Membership',
      benefits: [
        '✓ Mid-tier annual fee',
        '✓ Featured directory listing (top section)',
        '✓ 6 social media spotlights per year',
        '✓ Free attendance to 2 luncheons',
        '✓ 25% off all training & events',
        '✓ Opportunity to host a workshop',
        '✓ 1 free spotlight ad on home page (monthly rotation)'
      ]
    },
    gold: {
      title: 'Gold Membership',
      benefits: [
        '✓ Premium annual fee (best value)',
        '✓ Premium directory listing with video/promo',
        '✓ 12+ social media features annually',
        '✓ Free attendance to ALL events & luncheons',
        '✓ 40% off advertising & sponsorships',
        '✓ 2 guaranteed spotlight positions on home page',
        '✓ VIP networking receptions',
        '✓ Dedicated chamber liaison'
      ]
    }
  };
  
  // Function to show modal with benefits
  window.showBenefits = function(level) {
    const data = benefitsData[level];
    if (!data) return;
    
    modalTitle.textContent = data.title;
    modalBenefits.innerHTML = data.benefits.map(b => `<li>${b}</li>`).join('');
    modal.classList.add('active');
  };
  
  // Add click handlers to all info links
  const infoLinks = document.querySelectorAll('.info-link');
  infoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const level = link.getAttribute('data-modal');
      if (level) {
        showBenefits(level);
      }
    });
  });
  
  // Close modal when clicking the X
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  // Optional: Add form validation enhancement
  const form = document.getElementById('joinForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      const orgTitle = document.getElementById('orgTitle');
      if (orgTitle && orgTitle.value) {
        const pattern = /^[A-Za-z\s\-]{7,}$/;
        if (!pattern.test(orgTitle.value)) {
          e.preventDefault();
          alert('Organizational Title must be at least 7 characters and contain only letters, spaces, or hyphens.');
          orgTitle.focus();
        }
      }
    });
  }
});