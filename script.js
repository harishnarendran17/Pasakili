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
    "Sunfeast": ["Biscuits", "Noodles"],
    "Fiama": ["Body Wash", "Shampoo"]
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

// Show distributors and brands after location selection
function showDistributors() {
    const location = document.getElementById('locationSelect').value;
    const distributorList = document.getElementById('distributorList');
    distributorList.innerHTML = ""; // Clear list
    
    if (distributors[location]) {
        distributors[location].forEach((distributor) => {
            const distributorItem = document.createElement('li');
            distributorItem.className = 'distributor-item';
            distributorItem.innerHTML = `
                <span>${distributor.name} - Brands: ${distributor.brands.join(", ")}</span>
            `;
            distributorItem.onclick = () => showProducts(distributor);
            distributorList.appendChild(distributorItem);
        });
    } else {
        distributorList.innerHTML = "<li>No distributors found for this location.</li>";
    }
}

// Show products for a selected brand
function showProducts(distributor) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ""; // Clear previous products
    
    distributor.brands.forEach((brand) => {
        const brandProducts = products[brand] || [];
        brandProducts.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h3>${product} (${brand})</h3>
                <p>Distributor: ${distributor.name}</p>
                <p>Location: ${locationSelect.value}</p>
                <p>Contact: [Contact Details]</p>
                <input type="number" placeholder="Quantity" min="1" id="quantity_${product}" />
                <button onclick="addToCart('${product}', '${brand}', '${distributor.name}', '${locationSelect.value}')">Add to Cart</button>
            `;
            productList.appendChild(productCard);
        });
    });
    document.getElementById('productsSection').style.display = 'block';
}

// Add product to cart
function addToCart(product, brand, distributor, location) {
    const quantity = document.getElementById(`quantity_${product}`).value;
    const item = cart.find(i => i.product === product && i.brand === brand);
    if (item) {
        item.quantity += parseInt(quantity);
    } else {
        cart.push({ product, brand, distributor, location, quantity: parseInt(quantity) });
    }
    alert(`Added ${quantity} of ${product} (${brand}) to cart. Total items in cart: ${cart.length}`);
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

function initializeDistributorsPage() {
    showDistributors();
}

function initializeProductsPage() {
    showCart();
}
