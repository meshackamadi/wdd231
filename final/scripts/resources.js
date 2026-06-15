import { getPreference } from './storage.js';

async function loadResources() {
    try {
        // Example local partners and practical guides. Replace with live data if available.
        const ngos = [
            { name: "City Food Bank", contact: "contact@cityfoodbank.org", phone: "555-1234", website: "https://cityfoodbank.example.org", focus: "Prepared meals" },
            { name: "Neighborhood Pantry", contact: "pantry@neighborhood.org", phone: "555-5678", website: "https://neighborhoodpantry.example.org", focus: "Fresh produce" },
            { name: "Community Fridge Project", contact: "info@communityfridge.org", phone: "555-9999", website: "https://communityfridge.example.org", focus: "24/7 access" }
        ];

        const guides = [
            { title: "Safe Handling of Leftovers", points: ["Cool food to room temperature within 2 hours","Store in airtight containers","Label with date and contents","Refrigerate at 40°F (4°C) or below","Consume within 3 days"] },
            { title: "What Foods Can Be Shared?", points: ["Whole fruits and vegetables","Sealed bakery items","Unopened canned goods","Packaged dry goods","Hot prepared food in insulated containers (use caution)"] },
            { title: "Meeting & Pickup Best Practices", points: ["Arrange public pickup locations","Confirm time via message","Bring insulated bags or coolers","Wash hands before handling food","Respect donor notes and allergies"] }
        ];

        const container = document.getElementById('resources-container');
        container.innerHTML = `
            <div class="card">
                <h2>📘 Safety Guides</h2>
                ${guides.map(g => `
                    <section>
                        <h3>${g.title}</h3>
                        <ul>${g.points.map(p => `<li>${p}</li>`).join('')}</ul>
                    </section>
                `).join('')}
            </div>
            <div class="card">
                <h2>🤝 Local Partners & NGOs</h2>
                ${ngos.map(n => `
                    <div class="partner">
                        <h3>${n.name}</h3>
                        <p>${n.focus}</p>
                        <p>📞 ${n.phone} • ✉️ <a href="mailto:${n.contact}">${n.contact}</a></p>
                        <p><a href="${n.website}" target="_blank" rel="noopener">Visit website</a></p>
                    </div>
                `).join('')}
            </div>
            <div class="card">
                <h2>🚗 Pickup & Logistics</h2>
                <p>Simple steps to make pickups safe and smooth:</p>
                <ol>
                    <li>Confirm availability and pickup time with the donor.</li>
                    <li>Bring suitable containers or insulated bags.</li>
                    <li>Meet in a public, well-lit place for safety when needed.</li>
                </ol>
                <p>For organizations: consider partnering with local charities to scale impact.</p>
            </div>
        `;
    } catch (err) {
        console.error(err);
    }
}
document.addEventListener('DOMContentLoaded', loadResources);