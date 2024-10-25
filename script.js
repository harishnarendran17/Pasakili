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
    "Parachute": { details: ["Hair Oil", "Shampoo"], distributor: "Marico", contact: "1234567890", location: "Mumbai" },
    "Nihar": { details: ["Hair Oil", "Cream"], distributor: "Marico", contact: "1234567890", location: "Mumbai" },
    "Saffola": { details: ["Oats", "Oil"], distributor: "Marico", contact: "1234567890", location: "Mumbai" },
    "Dabur Amla": { details: ["Hair Oil", "Shampoo"], distributor: "Dabur", contact: "0987654321", location: "Mumbai" },
    "Dabur Honey": { details: ["Honey", "Ghee"], distributor: "Dabur", contact: "0987654321", location: "Mumbai" },
    "Colgate": { details: ["Toothpaste", "Toothbrush"], distributor: "Colgate-Palmolive", contact: "1112233445", location: "Delhi" },
    "Palmolive": { details: ["Shampoo", "Body Wash"], distributor: "Colgate-Palmolive", contact: "1112233445", location: "Delhi" },
    "Aashirvaad": { details: ["Flour", "Salt"], distributor: "ITC", contact: "2223344556", location: "Delhi" },
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
                <span>${distributor.name} - Brands: ${distributor.brands.length}</span>
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
        const brandProducts = Object.keys(products).filter(p => products[p].distributor === brand);
        
        brandProducts.forEach((product) => {
            const productDetails = products[product];
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h3>${product}</h3>
                <p>Distributor: ${productDetails.distributor}</p>
                <p>Contact: ${productDetails.contact}</p>
                <p>Location: ${productDetails.location}</p>
                <label for="qty-${product.replace(/\s+/g, '')}">Quantity:</label>
                <input type="number" value="1" min="1" id="qty-${product.replace(/\s+/g, '')}">
                <button onclick="addToCart('${product}')">Add to Cart</button>
            `;
            productList.appendChild(productCard);
        });
    });
}

// Add product to cart
function addToCart(product) {
    const quantity = parseInt(document.getElementById(`qty-${product.replace(/\s+/g, '')}`).value);
    const item = cart.find(i => i.product === product);
    
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    
    const speech = new SpeechSynthesisUtterance(`Added ${product} to cart. Total items in cart: ${cart.length}`);
    window.speechSynthesis.speak(speech);
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
                <span>${item.product} - Quantity: ${item.quantity}</span>
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
