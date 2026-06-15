// Read query string and display form submission details
const params = new URLSearchParams(window.location.search);

document.addEventListener('DOMContentLoaded', () => {
    const name = params.get('name');
    const email = params.get('email');
    const type = params.get('type');

    const noData = document.getElementById('no-data');
    const summary = document.getElementById('summary-list');

    if (name || email || type) {
        noData.style.display = 'none';
        summary.style.display = 'block';
        document.getElementById('s-name').innerText = name || '—';
        document.getElementById('s-email').innerText = email || '—';
        document.getElementById('s-type').innerText = type || '—';
    } else {
        noData.style.display = 'block';
        summary.style.display = 'none';
    }
});
