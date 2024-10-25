let distributors = {
    "Mumbai": [
        { name: "Distributor 1", brands: ["Brand A", "Brand B"] },
        { name: "Distributor 2", brands: ["Brand C", "Brand D"] },
        { name: "Distributor 3", brands: ["Brand E", "Brand F"] },
        { name: "Distributor 4", brands: ["Brand G", "Brand H"] },
        { name: "Distributor 5", brands: ["Brand I", "Brand J"] }
    ],
    "Delhi": [
        { name: "Distributor 6", brands: ["Brand K", "Brand L"] },
        { name: "Distributor 7", brands: ["Brand M", "Brand N"] },
        { name: "Distributor 8", brands: ["Brand O", "Brand P"] },
        { name: "Distributor 9", brands: ["Brand Q", "Brand R"] },
        { name: "Distributor 10", brands: ["Brand S", "Brand T"] }
    ]
};

let products = {
    "Brand A": ["Product 1", "Product 2"],
    "Brand B": ["Product 3", "Product 4"],
    "Brand C": ["Product 5", "Product 6"],
    "Brand D": ["Product 7", "Product 8"],
    // ... add other brands and products as needed
};

let cart = [];

// Show distributors after location selection
function showDistributors() {
    const location = document.getElementById('locationSelect').value;
    const distributorList = document.getElementById('distributorList');
    distributorList.innerHTML = ""; // Clear list

    if (distributors[location]) {
        distributors[location].forEach((distributor, index) => {
            const distributorItem = document.createElement('li');
            distributorItem.className = 'distributor-item';
            distributorItem.innerHTML = `
                <span>${distributor.name} - ${distributor.brands.join(", ")}</span>
                <button onclick="showProducts('${distributor.name}')">Select</button>
            `;
            distributorList.appendChild(distributorItem);
        });
    } else {
        distributorList.innerHTML = "<li>No distributors found for this location.</li>";
    }
}

// Show products for a selected brand
function showProducts(distributorName) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ""; // Clear previous products

    const selectedDistributor = distributors[document.getElementById('locationSelect').value]
        .find(d => d.name === distributorName);

    if (selectedDistributor) {
        selectedDistributor.brands.forEach(brand => {
            const brandProducts = products[brand] || [];
            brandProducts.forEach(product => {
                const productItem = document.createElement('li');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <span>${product} (${brand})</span>
                    <input type="number" min="1" value="1" id="${product}-quantity" />
                    <button onclick="addToCart('${product}', '${brand}')">Add to Cart</button>
                `;
                productList.appendChild(productItem);
            });
        });
    }

    document.getElementById('productsSection').style.display = 'block'; // Show products section
}

// Add product to cart with voice feedback
function addToCart(product, brand) {
    const quantityInput = document.getElementById(`${product}-quantity`);
    const quantity = parseInt(quantityInput.value);
    
    const item = cart.find(i => i.product === product && i.brand === brand);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ product, brand, quantity });
    }

    const message = `Added ${quantity} of ${product} (${brand}) to cart. Total items in cart: ${cart.reduce((total, item) => total + item.quantity, 0)}`;
    
    // Speak the message
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
    alert(message); // Show alert as well
}

// Initialize the page
function initializeLocationPage() {
    const locationSelect = document.getElementById('locationSelect');
    locationSelect.addEventListener('change', showDistributors);
}

document.addEventListener('DOMContentLoaded', initializeLocationPage);
