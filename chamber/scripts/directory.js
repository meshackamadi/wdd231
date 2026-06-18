// Fetch and render members directory
const membersContainer = document.getElementById('membersContainer');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

function createMemberCard(m) {
  const imgSrc = m.image ? `images/${m.image}` : 'https://via.placeholder.com/300x200?text=No+Image';
  return `
    <div class="course-card member-card">
      <img src="${imgSrc}" alt="${m.name}" class="member-img" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x200?text=No+Image'">
      <div class="card-content">
        <h3>${m.name}</h3>
        <div class="address">📍 ${m.address}</div>
        <div class="phone">📞 ${m.phone}</div>
        <div class="website-link">🌐 <a href="https://${m.website}" target="_blank">${m.website}</a></div>
        <span class="membership-badge ${m.membershipLevel === 3 ? 'gold' : m.membershipLevel === 2 ? 'silver' : 'member'}">${m.membershipLevel === 3 ? 'Gold Partner' : m.membershipLevel === 2 ? 'Silver Member' : 'Member'}</span>
      </div>
    </div>
  `;
}

async function loadMembers() {
  if (!membersContainer) return;
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    const members = data.members || [];
    if (members.length === 0) {
      membersContainer.innerHTML = '<div class="course-card full-width">No members found.</div>';
      return;
    }
    membersContainer.innerHTML = members.map(createMemberCard).join('');
  } catch (err) {
    membersContainer.innerHTML = `<div class="course-card full-width">Failed to load members: ${err.message}</div>`;
    console.error('Directory load error:', err);
  }
}

function setGridView() {
  membersContainer.classList.remove('list-view');
  gridViewBtn.classList.add('active-view');
  listViewBtn.classList.remove('active-view');
}

function setListView() {
  membersContainer.classList.add('list-view');
  listViewBtn.classList.add('active-view');
  gridViewBtn.classList.remove('active-view');
}

// Attach view toggle handlers if buttons exist
if (gridViewBtn && listViewBtn) {
  gridViewBtn.addEventListener('click', setGridView);
  listViewBtn.addEventListener('click', setListView);
}

// Load members when script is evaluated (defer in HTML ensures DOM is ready)
loadMembers();
