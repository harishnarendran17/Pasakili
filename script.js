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
    "Parachute": {
        name: "Hair Oil",
        distributor: "Marico",
        contact: "123-456-7890",
        location: "Mumbai"
    },
    "Nihar": {
        name: "Hair Oil",
        distributor: "Marico",
        contact: "123-456-7890",
        location: "Mumbai"
    },
    "Saffola": {
        name: "Oats",
        distributor: "Marico",
        contact: "123-456-7890",
        location: "Mumbai"
    },
    "Dabur Amla": {
        name: "Hair Oil",
        distributor: "Dabur",
        contact: "098-765-4321",
        location: "Mumbai"
    },
    "Dabur Honey": {
        name: "Honey",
        distributor: "Dabur",
        contact: "098-765-4321",
        location: "Mumbai"
    },
    "Colgate": {
        name: "Toothpaste",
        distributor: "Colgate-Palmolive",
        contact: "456-789-0123",
        location: "Delhi"
    },
    "Palmolive": {
        name: "Shampoo",
        distributor: "Colgate-Palmolive",
        contact: "456-789-0123",
        location: "Delhi"
    },
    "Aashirvaad": {
        name: "Flour",
        distributor: "ITC",
        contact: "321-654-9870",
        location: "Delhi"
    },
};

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

// Show distributors and their brand count after location selection
function showDistributors() {
    const location = document.getElementById('locationSelect').value;
    const distributorList = document.getElementById('distributorList');
    distributorList.innerHTML = ""; // Clear list

    if (distributors[location]) {
        distributors[location].forEach((distributor) => {
            const distributorItem = document.createElement('li');
            distributorItem.className = 'distributor-item';
            distributorItem.innerHTML = `
                <span>${distributor.name} - Brands: ${distributor.brands.join(', ')}</span>
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

// Show products for a selected brand
function initializeProductsPage() {
    const distributor = JSON.parse(localStorage.getItem('selectedDistributor'));
    const productList = document.getElementById('productList');
    productList.innerHTML = ""; // Clear previous products

    distributor.brands.forEach((brand) => {
        const productInfo = products[brand];
        if (productInfo) {
            const productItem = document.createElement('li');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <div>
                    <strong>${productInfo.name}</strong> from <strong>${productInfo.distributor}</strong>
                    <p>Contact: ${productInfo.contact}</p>
                    <p>Location: ${productInfo.location}</p>
                    <input type="number" min="1" value="1" id="quantity_${productInfo.name}">
                    <button onclick="addToCart('${productInfo.name}')">Add to Cart</button>
                </div>
            `;
            productList.appendChild(productItem);
        }
    });
}

// Function to add items to the cart with voice alert
function addToCart(product) {
    const quantity = document.getElementById(`quantity_${product}`).value;
    alert(`Added ${quantity} of ${product} to cart`);
    
    // Voice alert
    const utterance = new SpeechSynthesisUtterance(`Added ${quantity} of ${product} to cart`);
    window.speechSynthesis.speak(utterance);
}

// Call the initialize function on page load
window.onload = initializeProductsPage;
