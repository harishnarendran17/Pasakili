// Global variables for managing state
let distributors = {
    "Mumbai": [
        { name: "Distributor 1", brands: ["Parachute", "Saffola"] },
        { name: "Distributor 2", brands: ["Dabur Amla", "Dabur Honey"] },
    ],
    "Delhi": [
        { name: "Distributor 1", brands: ["Colgate", "Palmolive"] },
        { name: "Distributor 2", brands: ["Aashirvaad", "Sunfeast"] },
    ]
};

let products = {
    "Parachute": ["Hair Oil", "Shampoo"],
    "Saffola": ["Oats", "Oil"],
    "Dabur Amla": ["Hair Oil", "Shampoo"],
    "Dabur Honey": ["Honey", "Ghee"],
    "Colgate": ["Toothpaste", "Toothbrush"],
    "Palmolive": ["Shampoo", "Body Wash"],
    "Aashirvaad": ["Flour", "Salt"],
    "Sunfeast": ["Biscuits", "Noodles"]
};

let cart = [];

// Handle login based on role
function handleLogin(event) {
    event.preventDefault();
    const userRole = document.getElementById('userRole').value;
    const loginId = document.getElementById('loginId').value;
    
    if (userRole === 'retailer' && loginId === '1234') {
        localStorage.setItem('role', 'retailer');
        window.location.href = 'location.html';
    } else if (userRole === 'distributor' && loginId === 'distributor1234') {
        localStorage.setItem('role', 'distributor');
        window.location.href = 'distributors.html';
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
            distributorItem.onclick = () => showProducts(distributor);
            distributorList.appendChild(distributorItem);
        });
    } else {
        distributorList.innerHTML = "<li>No distributors found for this location.</li>";
    }

    // Animate distributor list to slide in
    distributorList.style.transition = 'transform 0.5s ease';
    distributorList.style.transform = 'translateX(0)';
}

// Show products for a selected brand
function showProducts(distributor) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ""; // Clear previous products
    
    distributor.brands.forEach((brand) => {
        const brandProducts = products[brand] || [];
        brandProducts.forEach((product) => {
            const productItem = document.createElement('li');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <span>${product} (${brand})</span>
                <button onclick="addToCart('${product}', '${brand}')">Add to Cart</button>
            `;
            productList.appendChild(productItem);
        });
    });
    document.getElementById('productsSection').style.display = 'block';
}

// Add product to cart
function addToCart(product, brand) {
    const item = cart.find(i => i.product === product && i.brand === brand);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ product, brand, quantity: 1 });
    }
    alert(`Added ${product} (${brand}) to cart. Total items in cart: ${cart.length}`);
}

// Initialization functions for page load
function initializeLocationPage() {
    const locationSelect = document.getElementById('locationSelect');
    locationSelect.onchange = showDistributors;
}

function initializeDistributorsPage() {
    showDistributors();
}

function initializeProductsPage() {
    showCart();
}
