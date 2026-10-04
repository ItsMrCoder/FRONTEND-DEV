// let products = [
//     {
//         name: 'Iphone 18',
//         price: 3000000000,
//         category: "Electronics",
//         img: './item-1.png'
//     },
//     {
//         name: 'BolaPSD',
//         price: 1200000,
//         category: "Fashion",
//         img: "./item-2.png"
//     },
//     {
//         name: 'Gucci Bag',
//         price: 60000,
//         category: "Bags",
//         img: "./item-3.png"
//     },
// ];

// let productContainer = document.querySelector('#product')

// products.forEach((product, index)=>{
//     productContainer.innerHTML += `
//     <div class = "product-card">
//         <h2>${product['name']}</h2>
//         <p>${product['price']}</p>
//         <p>${product['category']}</p>
//         <p><img src="${product['img']}" alt="${product['name']}"></p> 
//         <button> Buy Now </button>
//     </div>
//     `
// })    
// number = 0
// number += 1

// ---------- Data ----------
// Each product needs a unique id now (the cart uses it).
let products = [
    {
        id: 1,
        name: 'Iphone 18',
        price: 3000000000,
        category: "Electronics",
        img: './item-1.png'
    },
    {
        id: 2,
        name: 'BolaPSD',
        price: 1200000,
        category: "Fashion",
        img: "./item-2.png"
    },
    {
        id: 3,
        name: 'Gucci Bag',
        price: 60000,
        category: "Bags",
        img: "./item-3.png"
    },
    // Sample products with no image yet: they show a placeholder tile.
    // Add an img path (e.g. './item-4.png') or delete them.
    {
        id: 4,
        name: 'Wireless Earbuds',
        price: 18500,
        category: "Electronics",
        img: ''
    },
    {
        id: 5,
        name: 'Ankara Shirt',
        price: 12000,
        category: "Fashion",
        img: ''
    },
    {
        id: 6,
        name: 'Canvas Backpack',
        price: 22000,
        category: "Bags",
        img: ''
    },
    {
        id: 7,
        name: 'Phone Case',
        price: 3500,
        category: "Electronics",
        img: ''
    },
];

// ---------- Elements ----------
const productContainer = document.querySelector('#product');
const categoriesBox = document.querySelector('#categories');
const searchInput = document.querySelector('#search');
const sortSelect = document.querySelector('#sort');
const resultCount = document.querySelector('#result-count');

const cartToggle = document.querySelector('#cart-toggle');
const cartCount = document.querySelector('#cart-count');
const cartPanel = document.querySelector('#cart');
const cartItems = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const closeCartBtn = document.querySelector('#cart-close');
const checkoutBtn = document.querySelector('#checkout');
const clearBtn = document.querySelector('#clear-cart');
const overlay = document.querySelector('#overlay');

// ---------- Helpers ----------
const CART_KEY = 'small-temu-cart';

function formatPrice(amount) {
    return amount.toLocaleString('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
    });
}

function escapeHTML(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function getProduct(id) {
    return products.find(p => p.id === Number(id));
}

function placeholderHTML(name) {
    return `<div class="img-placeholder" role="img" aria-label="${escapeHTML(name)}">${escapeHTML(name.charAt(0).toUpperCase())}</div>`;
}

// ---------- Cart state (saved in the browser so it survives a refresh) ----------
// cart looks like { "1": 2, "3": 1 }  ->  product id : quantity
let cart = loadCart();

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY)) || {};
        const clean = {};
        for (const [id, qty] of Object.entries(saved)) {
            if (getProduct(id) && Number.isInteger(qty) && qty > 0) {
                clean[id] = qty;
            }
        }
        return clean;
    } catch {
        return {};
    }
}

function saveCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
        // Storage can be blocked (private mode). The cart still works for this visit.
    }
}

function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    updateCart();
}

function changeQty(id, change) {
    cart[id] = (cart[id] || 0) + change;
    if (cart[id] <= 0) {
        delete cart[id];
    }
    updateCart();
}

function removeFromCart(id) {
    delete cart[id];
    updateCart();
}

function clearCart() {
    cart = {};
    updateCart();
}

function updateCart() {
    saveCart();
    renderCart();
}

// ---------- Products: filter, search, sort ----------
let activeCategory = 'All';

function getVisibleProducts() {
    const query = searchInput.value.trim().toLowerCase();

    let list = products.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(query)
            || product.category.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    if (sortSelect.value === 'low') {
        list.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === 'high') {
        list.sort((a, b) => b.price - a.price);
    } else if (sortSelect.value === 'name') {
        list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
}

function renderProducts() {
    const list = getVisibleProducts();

    resultCount.textContent = list.length === 1 ? '1 product' : `${list.length} products`;

    if (list.length === 0) {
        const query = searchInput.value.trim();
        productContainer.innerHTML = `
            <p class="empty">No products found${query ? ` for "${escapeHTML(query)}"` : ''}. Try another search or category.</p>
        `;
        return;
    }

    productContainer.innerHTML = list.map(product => `
    <div class="product-card">
        ${product.img
            ? `<img src="${product.img}" alt="${escapeHTML(product.name)}">`
            : placeholderHTML(product.name)}
        <h2>${escapeHTML(product.name)}</h2>
        <p class="price">${formatPrice(product.price)}</p>
        <p class="category">${escapeHTML(product.category)}</p>
        <button data-id="${product.id}">Add to cart</button>
    </div>
    `).join('');
}

function renderCategories() {
    const categories = ['All', ...new Set(products.map(p => p.category))];

    categoriesBox.innerHTML = categories.map(category => `
        <button class="chip" data-category="${escapeHTML(category)}" aria-pressed="${category === activeCategory}">
            ${escapeHTML(category)}
        </button>
    `).join('');
}

// ---------- Cart drawer ----------
function renderCart() {
    const entries = Object.entries(cart);
    const count = entries.reduce((sum, [, qty]) => sum + qty, 0);
    const total = entries.reduce((sum, [id, qty]) => sum + getProduct(id).price * qty, 0);

    cartCount.textContent = count;
    cartTotal.textContent = formatPrice(total);
    checkoutBtn.disabled = count === 0;
    clearBtn.disabled = count === 0;

    if (entries.length === 0) {
        cartItems.innerHTML = `<p class="empty">Your cart is empty. Add something from the shop.</p>`;
        return;
    }

    cartItems.innerHTML = entries.map(([id, qty]) => {
        const product = getProduct(id);
        const name = escapeHTML(product.name);
        return `
        <div class="cart-row">
            <div>
                <strong>${name}</strong>
                <div class="muted">${formatPrice(product.price)} each</div>
            </div>
            <strong>${formatPrice(product.price * qty)}</strong>
            <div class="qty">
                <button data-action="dec" data-id="${id}" aria-label="Decrease quantity of ${name}">&minus;</button>
                <span>${qty}</span>
                <button data-action="inc" data-id="${id}" aria-label="Increase quantity of ${name}">+</button>
            </div>
            <button class="link-btn" data-action="remove" data-id="${id}">Remove</button>
        </div>
        `;
    }).join('');
}

function setCartOpen(open) {
    cartPanel.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
    cartToggle.setAttribute('aria-expanded', open);
    if (open) {
        closeCartBtn.focus();
    } else {
        cartToggle.focus();
    }
}

// ---------- Events ----------
productContainer.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-id]');
    if (!button) return;

    addToCart(button.dataset.id);

    button.textContent = 'Added';
    setTimeout(() => {
        button.textContent = 'Add to cart';
    }, 800);
});

// If an image file is missing, swap it for the placeholder tile.
// (Image errors don't bubble, so we listen in the capture phase.)
productContainer.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.outerHTML = placeholderHTML(e.target.alt || '?');
    }
}, true);

categoriesBox.addEventListener('click', (e) => {
    const chip = e.target.closest('button[data-category]');
    if (!chip) return;

    activeCategory = chip.dataset.category;
    renderCategories();
    renderProducts();
});

searchInput.addEventListener('input', renderProducts);
sortSelect.addEventListener('change', renderProducts);

cartItems.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-action]');
    if (!button) return;

    const { action, id } = button.dataset;
    if (action === 'inc') changeQty(id, 1);
    if (action === 'dec') changeQty(id, -1);
    if (action === 'remove') removeFromCart(id);
});

cartToggle.addEventListener('click', () => setCartOpen(true));
closeCartBtn.addEventListener('click', () => setCartOpen(false));
overlay.addEventListener('click', () => setCartOpen(false));
clearBtn.addEventListener('click', clearCart);

checkoutBtn.addEventListener('click', () => {
    // Stand-in for a real checkout: there is no payment or server yet.
    alert(`Order placed! Total: ${cartTotal.textContent}`);
    clearCart();
    setCartOpen(false);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartPanel.classList.contains('open')) {
        setCartOpen(false);
    }
});

// ---------- Start ----------
renderCategories();
renderProducts();
renderCart();