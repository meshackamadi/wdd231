const modal = document.getElementById('food-modal');

export function openModal(food) {
    if (!modal) return;
    document.getElementById('modal-title').innerText = food.title;
    document.getElementById('modal-desc').innerText = food.description;
    document.getElementById('modal-expiry').innerText = food.expires;
    document.getElementById('modal-location').innerText = food.location;
    modal.showModal();
    // move focus to close button for accessibility
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) closeBtn.focus();
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => modal?.close());
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
});