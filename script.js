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
                <span>${distributor.name} - Brands: ${distributor.brands.length}</span>
            `;
            distributorItem.onclick = () => showProducts(distributor);
            distributorList.appendChild(distributorItem);
        });
    } else {
        distributorList.innerHTML = "<li>No distributors available</li>";
    }
}

// Show products based on distributor
function showProducts(distributor) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ""; // Clear list

    // Check if the product list exists
    if (!productList) {
        console.error('productList element is null');
        return;
    }

    distributor.brands.forEach((brand) => {
        const productItem = document.createElement('li');
        productItem.className = 'product-item';
        productItem.innerHTML = brand; // Display brand name
        productItem.onclick = () => displayProductDetails(brand);
        productList.appendChild(productItem);
    });
}

// Display product details
function displayProductDetails(brand) {
    const product = products[brand];
    if (product) {
        const productDetails = `
            <h2>${product.name}</h2>
            <p>Distributor: ${product.distributor}</p>
            <p>Contact: ${product.contact}</p>
            <p>Location: ${product.location}</p>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" value="1" min="1">
            <button onclick="addToCart('${brand}')">Add to Cart</button>
        `;
        document.getElementById('productList').innerHTML = productDetails;
    } else {
        alert('Product not found');
    }
}

// Add selected product to cart
function addToCart(brand) {
    const quantity = document.getElementById('quantity').value;
    alert(`${quantity} of ${brand} added to cart`);
}
