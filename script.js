// Global variables for managing state
let distributors = {
    "Mumbai": [
        { name: "Marico", brands: ["Parachute", "Nihar", "Saffola"] },
        { name: "Dabur", brands: ["Dabur Amla", "Dabur Honey", "Dabur Gulabari"] },
    ],
    "Delhi": [
        { name: "Colgate-Palmolive", brands: ["Colgate", "Palmolive", "Kissan"] },
        { name: "ITC", brands: ["Aashirvaad", "Sunfeast", "Fiama"] },
    ]
};

let products = {
    "Parachute": ["Hair Oil", "Shampoo"],
    "Nihar": ["Hair Oil", "Cream"],
    "Saffola": ["Oats", "Oil"],
    "Dabur Amla": ["Hair Oil", "Shampoo"],
    "Dabur Honey": ["Honey", "Ghee"],
    "Colgate": ["Toothpaste", "Toothbrush"],
    "Palmolive": ["Shampoo", "Body Wash"],
    "Aashirvaad": ["Flour", "Salt"]
};

let cart = [];

// Handle login based on role
function handleLogin(event) {
    event.preventDefault();
    const userRole = document.getElementById('userRole').value;
    const loginId = document.getElementById('loginId').value;
    
    if (userRole === 'retailer' && loginId === '1234') {
        localStorage.setItem('role', 'retailer');
        window.location.href = 'location.html'; // Redirect to location page
    } else if (userRole === 'distributor' && loginId === 'distributor1234') {
        localStorage.setItem('role', 'distributor');
        window.location.href = 'distributors.html'; // Redirect to distributor page
    } else {
        alert('Invalid login credentials');
    }
}

// Show distributors after location selection
function showDistributors() {
    const location = document.getElementById('locationSelect').value;
    const distributorList = document.getElementById('distributorList');
    distributorList.innerHTML = ""; // Clear list
    
    if (distributors[location]) {
        distributors[location].forEach((distributor) => {
            const distributorItem = document.createElement('li');
            distributorItem.className = 'distributor-item';
            distributorItem.innerHTML = `
                <span>${distributor.name} - ${distributor.brands.join(", ")}</span>
            `;
            distributorItem.onclick = () => {
                localStorage.setItem('selectedDistributor', JSON.stringify(distributor));
                window.location.href = 'products.html'; // Redirect to products page
            };
            distributorList.appendChild(distributorItem);
        });
    } else {
        distributorList.innerHTML = "<li>No distributors found for this location.</li>";
    }
}

// Show products for a selected distributor
function showProducts() {
    const distributor = JSON.parse(localStorage.getItem('selectedDistributor'));
    const productList = document.getElementById('productList');
    productList.innerHTML = ""; // Clear previous products

    distributor.brands.forEach((brand) => {
        const brandProducts = products[brand] || [];
        brandProducts.forEach((product) => {
            const productItem = document.createElement('li');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <span>${product} (${brand})</span>
                <input type="number" value="1" min="1" id="qty-${product.replace(/\s+/g, '')}"> <!-- Quantity Input -->
                <button onclick="addToCart('${product}', '${brand}')">Add to Cart</button>
            `;
            productList.appendChild(productItem);
        });
    });
}

// Add product to cart
function addToCart(product, brand) {
    const item = cart.find(i => i.product === product && i.brand === brand);
    if (item) {
        item.quantity += parseInt(document.getElementById(`qty-${product.replace(/\s+/g, '')}`).value); // Get quantity from input
    } else {
        cart.push({ product, brand, quantity: parseInt(document.getElementById(`qty-${product.replace(/\s+/g, '')}`).value) });
    }
    alert(`Added ${product} (${brand}) to cart. Total items in cart: ${cart.length}`);
}

// Display cart
function showCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = ""; // Clear cart list
    
    if (cart.length > 0) {
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.product} (${item.brand}) - Quantity: ${item.quantity}</span>
            `;
            cartList.appendChild(cartItem);
        });
    } else {
        cartList.innerHTML = "<li>Your cart is empty.</li>";
    }
}

// Initialization functions for page load
function initializeLocationPage() {
    const locationSelect = document.getElementById('locationSelect');
    locationSelect.onchange = showDistributors;
}

function initializeProductsPage() {
    showProducts();
}
