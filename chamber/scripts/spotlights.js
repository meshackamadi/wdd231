// Member data for spotlights (simulates fetching from members.json)
const allMembers = [
  { name: "TechHub Pro", address: "123 Digital Ave, Silicon Valley, CA", phone: "(555) 123-4567", website: "www.techhubpro.com", logo: "https://picsum.photos/id/0/100/100", membershipLevel: 3 },
  { name: "GadgetFix Express", address: "456 Repair Ln, Austin, TX", phone: "(555) 234-5678", website: "www.gadgetfix.com", logo: "https://picsum.photos/id/1/100/100", membershipLevel: 2 },
  { name: "MobileMasters", address: "789 Wireless Blvd, Seattle, WA", phone: "(555) 345-6789", website: "www.mobilemasters.com", logo: "https://picsum.photos/id/2/100/100", membershipLevel: 3 },
  { name: "Laptop Loft", address: "101 Computing Cir, Boston, MA", phone: "(555) 456-7890", website: "www.laptoploft.com", logo: "https://picsum.photos/id/3/100/100", membershipLevel: 1 },
  { name: "Accessory World", address: "202 Device Dr, Chicago, IL", phone: "(555) 567-8901", website: "www.accessoryworld.com", logo: "https://picsum.photos/id/4/100/100", membershipLevel: 2 },
  { name: "Phone Palace", address: "303 Cellular Ct, Miami, FL", phone: "(555) 678-9012", website: "www.phonepalace.com", logo: "https://picsum.photos/id/5/100/100", membershipLevel: 3 },
  { name: "Digital Den", address: "404 Tech Ter, Denver, CO", phone: "(555) 789-0123", website: "www.digitalden.com", logo: "https://picsum.photos/id/6/100/100", membershipLevel: 1 }
];

// Get random gold/silver members for spotlights
function getRandomSpotlights(count = 3) {
  const goldSilver = allMembers.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);
  const shuffled = [...goldSilver];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function renderSpotlights() {
  const container = document.getElementById('spotlightsContainer');
  if (!container) return;
  
  const spotlights = getRandomSpotlights(3);
  const html = spotlights.map(m => {
    const levelText = m.membershipLevel === 3 ? "Gold Partner" : "Silver Member";
    const levelClass = m.membershipLevel === 3 ? "gold" : "silver";
    return `
      <div class="spotlight-card">
        <img src="${m.logo}" alt="${m.name}" class="spotlight-logo" loading="lazy">
        <h3>${m.name}</h3>
        <div class="spotlight-detail">📍 ${m.address}</div>
        <div class="spotlight-detail">📞 ${m.phone}</div>
        <div class="spotlight-detail">🌐 <a href="https://${m.website}" target="_blank" style="color: var(--primary-dark);">${m.website}</a></div>
        <span class="membership-badge ${levelClass}">${levelText}</span>
      </div>
    `;
  }).join('');
  container.innerHTML = html;
}

// Render spotlights when page loads
renderSpotlights();