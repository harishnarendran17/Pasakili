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
    "Aashirvaad": ["Flour", "Salt"],
    "Sunfeast": ["Biscuits", "Pasta"],
    "Fiama": ["Body Wash", "Shampoo"],
};

// Initialize cart
let cart = [];

// Handle login based on role
function handleLogin(event) {
    event.preventDefault();
    const userRole = document.getElementById('userRole').value;
    const loginId = document.getElementById('loginId').value;

    if (userRole === 'retailer' && loginId === 'custom1234') {
        localStorage.setItem('role', 'retailer');
        window.location.href = 'location.html';
    } else if (userRole === 'distributor' && loginId === 'distributor1234') {
        localStorage.setItem('role', 'distributor');
        window.location.href = 'distributors.html';
    } else {
        alert('Invalid login credentials');
    }
}

// Show brands based on selected location
function showBrands() {
    const location = document.getElementById('locationSelect').value;
    const brandList = document.getElementById('brandList');
    brandList.innerHTML = ""; // Clear previous brands

    if (distributors[location]) {
        distributors[location].forEach((distributor) => {
            distributor.brands.forEach((brand) => {
                const brandItem = document.createElement('li');
                brandItem.innerHTML = `<span onclick="showProducts('${distributor.name}', '${brand}')">${brand}</span>`;
                brandList.appendChild(brandItem);
            });
        });
    } else {
        brandList.innerHTML = "<li>No brands found for this location.</li>";
    }
}

// Function to navigate to the products page
function showProducts(distributorName, brand) {
    localStorage.setItem('selectedDistributor', distributorName);
    localStorage.setItem('selectedBrand', brand);
    window.location.href = 'products.html'; // Navigate to products page
}

// Display products for the selected brand
function displayProducts() {
    const productList = document.getElementById('productList');
    const brand = localStorage.getItem('selectedBrand');
    const distributor = localStorage.getItem('selectedDistributor');
    
    const brandProducts = products[brand] || [];

    brandProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3>${product} (${brand})</h3>
            <p>Distributor: ${distributor}</p>
            <p>Location: ${localStorage.getItem('selectedLocation')}</p>
            <p>Contact: [Contact Details]</p>
            <input type="number" placeholder="Quantity" min="1" id="quantity_${product}" />
            <button onclick="addToCart('${product}', '${brand}', '${distributor}')">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(product, brand, distributor) {
    const quantityInput = document.getElementById(`quantity_${product}`);
    const quantity = quantityInput.value ? parseInt(quantityInput.value) : 1;

    const item = cart.find(i => i.product === product && i.brand === brand);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ product, brand, distributor, quantity });
    }
    alert(`Added ${quantity} ${product} (${brand}) to cart. Total items in cart: ${cart.length}`);
    speakOut(`Added ${quantity} ${product} (${brand}) to cart.`);
}

// Function to speak out the message
function speakOut(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
}

// Initialization functions for page load
function initializeLocationPage() {
    const locationSelect = document.getElementById('locationSelect');
    locationSelect.onchange = showBrands;
}

function initializeDistributorsPage() {
    // Add any necessary initialization for distributors page here
    showDistributors();
}

function initializeProductsPage() {
    displayProducts();
}

// Call initialization functions based on page
window.onload = function() {
    if (document.getElementById('locationSelect')) {
        initializeLocationPage();
    } else if (document.getElementById('productList')) {
        initializeProductsPage();
    }
};
