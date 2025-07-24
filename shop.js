// Shop items (match powerups, upgrades, and game currency themes)
const SHOP_ITEMS = [
    {
        id: 'health_potion',
        name: 'Health Pack',
        desc: 'Restore 30 health in-game.',
        price: 40,
    },
    {
        id: 'ammo_refill',
        name: 'Ammo Pack',
        desc: 'Add 5 bullets instantly.',
        price: 30,
    },
    {
        id: 'max_ammo_upgrade',
        name: 'Upgrade Max Ammo',
        desc: 'Increase your max ammo permanently by 2.',
        price: 120,
    },
    {
        id: 'speed_boost',
        name: 'Speed Boost',
        desc: 'Increase player speed for this session.',
        price: 90,
    },
    {
        id: 'zombie_lure',
        name: 'Zombie Lure',
        desc: 'Distract zombies for 5 seconds.',
        price: 70,
    },
    {
        id: 'gold_skin',
        name: 'Gold Player Skin',
        desc: 'Cosmetic only. Shine bright!',
        price: 300,
    }
];

// Persistent player state (simulate game stats)
let state = {
    coins: 120,
    level: 1,
    inventory: []
};

// Load state from localStorage if available
function loadState() {
    try {
        const saved = localStorage.getItem('zhorde_shop_state');
        if (saved) state = JSON.parse(saved);
    } catch (e) {}
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('zhorde_shop_state', JSON.stringify(state));
}

// Update UI
function updateUI() {
    document.getElementById('coin-count').textContent = state.coins;
    document.getElementById('player-level').textContent = state.level;
    // Inventory
    const ul = document.getElementById('inventory-list');
    ul.innerHTML = '';
    if (state.inventory.length === 0) {
        ul.innerHTML = `<li style="color: #888">No items owned yet.</li>`;
    } else {
        state.inventory.forEach(itemId => {
            const item = SHOP_ITEMS.find(i => i.id === itemId);
            if (item) {
                const li = document.createElement('li');
                li.textContent = item.name + (['max_ammo_upgrade','gold_skin'].includes(item.id)?' (Permanent)':'');
                ul.appendChild(li);
            }
        });
    }
}

// Buy item logic
function buyItem(itemId) {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    if (state.coins < item.price) {
        alert('Not enough coins!');
        return;
    }
    // For permanent upgrades/cosmetics, only allow once
    if ((item.id === 'max_ammo_upgrade' || item.id === 'gold_skin') && state.inventory.includes(itemId)) {
        alert('You already own this!');
        return;
    }
    state.coins -= item.price;
    state.inventory.push(itemId);
    updateUI();
    saveState();
}

// Render shop items
function renderShop() {
    const shopDiv = document.querySelector('.shop-items');
    shopDiv.innerHTML = '';
    SHOP_ITEMS.forEach(item => {
        const div = document.createElement('div');
        div.className = 'shop-item';
        div.innerHTML = `
            <div class="info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
            </div>
            <span class="price">${item.price} <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1fa99.png" width="18" style="vertical-align:middle"></span>
            <button class="buy-btn" ${(['max_ammo_upgrade','gold_skin'].includes(item.id) && state.inventory.includes(item.id)) ? 'disabled' : ''}>
                ${(['max_ammo_upgrade','gold_skin'].includes(item.id) && state.inventory.includes(item.id)) ? 'Owned' : 'Buy'}
            </button>
        `;
        div.querySelector('.buy-btn').onclick = () => buyItem(item.id);
        shopDiv.appendChild(div);
    });
}

document.getElementById('save-btn').onclick = saveState;
document.getElementById('load-btn').onclick = () => {
    loadState();
    updateUI();
    renderShop();
};

// Startup
loadState();
updateUI();
renderShop();
// shop.html (JavaScript snippet)
const params = new URLSearchParams(window.location.search);
const coins = params.get("coins");
const rankName = params.get("rankName");
const rankXP = params.get("rankXP");
const rankLevel = params.get("rankLevel");
// Use these to update your shop UI!
