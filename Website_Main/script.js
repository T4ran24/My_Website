
const database = [
    // Accessories 
    { id: 1, name: "PandaPal Bracelets", price: 20, img_src: "Accesories_Images/Accesories1.jpeg", description: "Colorful woven bracelets with cute panda charms...", category: "accessories" },
    { id: 2, name: "SunWeave Shawl", price: 30, img_src: "Accesories_Images/Accesories2.jpeg", description: "A vibrant, hand-crocheted shawl with a gradient...", category: "accessories" },
    { id: 3, name: "IridaSpin Ring", price: 50, img_src: "Accesories_Images/Accesories3.jpeg", description: "A stainless steel ring with a spinning iridescent band...", category: "accessories" },
    { id: 4, name: "NovaFit Smartwatch", price: 150, img_src: "Accesories_Images/Accesories4.jpeg", description: "A sleek smartwatch with fitness tracking...", category: "accessories" },
    { id: 5, name: "OceanPulse Watch", price: 210, img_src: "Accesories_Images/Accesories5.jpeg", description: "A stylish two-tone watch with a deep blue face...", category: "accessories" },
    { id: 6, name: "SkyShade Sunglasses", price: 15, img_src: "Accesories_Images/Accesories6.jpeg", description: "Modern sunglasses with polarized blue lenses...", category: "accessories" },
    
    // Sport
    { id: 7, name: "Gold Standart Whey Protein", price: 140, img_src: "Sport_Images/Sport_Section1.jpg", description: "Premium Whey Protein – build muscle, recover faster...", category: "sport" },
    { id: 8, name: "Gold Creatine", price: 40, img_src: "Sport_Images/Sport_Section2.jpg", description: "Gold Creatine – boost your power, improve endurance...", category: "sport" },
    { id: 9, name: "Superior Amino 2222", price: 50, img_src: "Sport_Images/Sport_Section3.jpg", description: "Amino – support muscle recovery, enhance endurance...", category: "sport" },
    { id: 10, name: "BCAA 1000", price: 30, img_src: "Sport_Images/Sport_Section4.jpg", description: "BCAA – boost muscle growth, reduce fatigue...", category: "sport" },
    { id: 11, name: "Mk-677", price: 60, img_src: "Sport_Images/Sport_Section5.jpg", description: "MK-677 – stimulate growth hormone, boost muscle gains...", category: "sport" },
    { id: 12, name: "ISO Whey Protein", price: 80, img_src: "Sport_Images/Sport_Section6.jpg", description: "ISO Protein – pure whey isolate for fast muscle recovery...", category: "sport" },
    
    // Beauty
    { id: 13, name: "Bare Vanilla Body Lotion", price: 20, img_src: "Beauty_Images/vs.bodylotion.barevanilla.png", description: "Celebrate the collection that celebrates you...", category: "beauty" },
    { id: 14, name: "Love Spell Body Mist", price: 23, img_src: "Beauty_Images/body-mist-250ml-original-love-spell.jpg", description: "Refreshing body mist with cherry blossom and peach scent...", category: "beauty" },
    { id: 15, name: "Dior Rosy Glow Blush", price: 40, img_src: "Beauty_Images/diorblush.jpeg", description: "Iconic blush that reacts to skin's moisture level...", category: "beauty" },
    { id: 16, name: "YSL Lash Clash Mascara", price: 33, img_src: "Beauty_Images/Yves Saint Laurent Lash Clash Extreme Volume Mascara.webp", description: "A couture mascara with an oversized brush...", category: "beauty" },
    { id: 17, name: "NARS Powermatte Lipstick", price: 34, img_src: "Beauty_Images/nars.lipstick.webp", description: "A transfer-resistant, matte lipstick that glides on...", category: "beauty" },
    { id: 18, name: "Rare Beauty Lip Oil", price: 22, img_src: "Beauty_Images/rarebeautylipoil.jpeg", description: "An innovative gel-to-oil formula that starts glossy...", category: "beauty" },
    
    // Parfume
    { id: 19, name: "Imagination", price: 899, img_src: "Parfume_Images/Parfume_Section1.jpg", description: "Louis Vuitton Imagination is a vibrant, citrus-aromatic...", category: "parfume" },
    { id: 20, name: "L'lmmensite", price: 499, img_src: "Parfume_Images/Parfume_Section2.jpg", description: "L'Immensité by Louis Vuitton is a vibrant...", category: "parfume" },
    { id: 21, name: "Ombre Nomade", price: 1000, img_src: "Parfume_Images/Parfume_Section3.jpg", description: "Ombre Nomade by Louis Vuitton is a luxurious...", category: "parfume" },
    { id: 22, name: "Afternoon Swim", price: 860, img_src: "Parfume_Images/Parfume_Section4.jpg", description: "Afternoon Swim by Louis Vuitton is a vibrant...", category: "parfume" },
    { id: 23, name: "Pacific Chill", price: 687, img_src: "Parfume_Images/Parfume_Section5.jpg", description: "Pacific Chill by Louis Vuitton is a refreshing...", category: "parfume" },
    { id: 24, name: "Parfums de Marly Layton", price: 350, img_src: "Parfume_Images/Parfume_Section6.jpeg", description: "Layton by Parfums de Marly is a luxurious...", category: "parfume" }
];

// Shopping Cart Functions
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
    alert(`${product.name} has been added to your cart!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcons = document.querySelectorAll('.fa-shopping-cart');
    
    cartIcons.forEach(icon => {
        // Remove existing count if any
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

// Initialize page based on current URL
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

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initPage);