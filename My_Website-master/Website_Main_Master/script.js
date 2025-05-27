let database = []; 

async function loadDatabase() {
    try {
        const response = await fetch('database.json');
        if (!response.ok) throw new Error('Failed to load database.json');
        database = await response.json();
        initPage();
    } catch (error) {
        console.error('Error loading database:', error);
    }
}

function addToCart(productId) {
    const product = database.find(item => item.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            id: product.id,
            name: product.name,
            price: product.price,
            img_src: product.img_src,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} has been added to your cart!`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    document.body.appendChild(notification);

    const notifications = document.querySelectorAll('.notification');
    const notificationHeight = 60;
    let offset = 20;

    notifications.forEach((notif, index) => {
        if (notif === notification) {
            notif.style.bottom = `${offset}px`;
        } else {
            offset += notificationHeight;
            notif.style.bottom = `${offset}px`;
        }
    });

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
            const remainingNotifs = document.querySelectorAll('.notification');
            let newOffset = 20;
            remainingNotifs.forEach(notif => {
                notif.style.bottom = `${newOffset}px`;
                newOffset += notificationHeight;
            });
        }, 300);
    }, 3000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcons = document.querySelectorAll('.fa-shopping-cart');

    cartIcons.forEach(icon => {
        const existingCount = icon.querySelector('.cart-count');
        if (existingCount) {
            existingCount.remove();
        }
        if (totalItems > 0) {
            const countElement = document.createElement('span');
            countElement.className = 'cart-count';
            countElement.textContent = totalItems;
            icon.appendChild(countElement);
        }
    });
}

function displayProducts(category) {
    const productSection = document.querySelector('.product-section');
    if (!productSection) return;

    const filteredProducts = category ? 
        database.filter(product => product.category === category) : 
        [
            database.find(p => p.id === 19),
            database.find(p => p.id === 13), 
            database.find(p => p.id === 7),  
            database.find(p => p.id === 20), 
            database.find(p => p.id === 14), 
            database.find(p => p.id === 8),
            database.find(p => p.id === 21),
            database.find(p => p.id === 1),
            database.find(p => p.id === 2),
            database.find(p => p.id === 3),
            database.find(p => p.id === 4),
            database.find(p => p.id === 9),   
        ];

    productSection.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.img_src}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <details>
                <summary>Details</summary>
                <p>${product.description}</p>
            </details>
            <button onclick="addToCart(${product.id})">Add to Bag</button>
        </div>
    `).join('');
}

function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="index.html">Continue shopping</a></p>';
        return;
    }

    cartContainer.innerHTML = `
        <div class="cart-container">
            <div class="cart-items-list">
                ${cart.map(item => {
                    const itemTotal = item.price * item.quantity;
                    totalPrice += itemTotal;
                    return `
                        <div class="cart-item">
                            <img src="${item.img_src}" alt="${item.name}">
                            <div class="cart-item-details">
                                <h3>${item.name}</h3>
                                <p>$${item.price.toFixed(2)}</p>
                                <div class="quantity-controls">
                                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                                </div>
                                <p>Total: $${itemTotal.toFixed(2)}</p>
                                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="cart-summary">
                <h3>Order Summary</h3>
                <div class="summary-details">
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>$${totalPrice.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span>$${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
                <button class="checkout-btn">Proceed to Checkout</button>
            </div>
        </div>
    `;
}

function changeQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function initPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (page === "Shopping_cart.html") {
        displayCart();
    } else {
        let category = '';
        if (page === "Accessories.html") category = "accessories";
        else if (page === "Parfume.html") category = "parfume";
        else if (page === "beauty.html") category = "beauty";
        else if (page === "sport.html") category = "sport";

        displayProducts(category);
    }

    updateCartCount();
}


document.addEventListener('DOMContentLoaded', loadDatabase);
