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
    "Aashirvaad": {
        name: "Flour",
        distributor: "ITC",
        contact: "321-654-9870",
        location: "Delhi"
    },
    "Sunfeast": {
        name: "Biscuits",
        distributor: "ITC",
        contact: "321-654-9870",
        location: "Delhi"
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

// Show distributors after location selection
function showDistributors() {
    const location = document.getElementById('locationSelect').value;
    const distributorList = document.getElementById('distributorList');
    distributorList.innerHTML = ""; // Clear distributor list

    if (distributors[location]) {
        distributors[location].forEach((distributor) => {
            const distributorItem = document.createElement('li');
            distributorItem.innerHTML = `
                <strong>${distributor.name}</strong> - Brands: ${distributor.brands.length}
            `;
            distributorItem.onclick = () => {
                localStorage.setItem('selectedDistributor', distributor.name);
                showBrands(distributor.brands);
            };
            distributorList.appendChild(distributorItem);
        });
    } else {
        distributorList.innerHTML = "<li>No distributors available</li>";
    }
}

// Show brand names
function showBrands(brands) {
    const brandList = document.getElementById('brandList');
    brandList.innerHTML = ""; // Clear previous brands

    brands.forEach((brand) => {
        const brandItem = document.createElement('li');
        brandItem.innerText = brand;
        brandItem.onclick = () => {
            localStorage.setItem('selectedBrand', brand);
            window.location.href = 'products.html';
        };
        brandList.appendChild(brandItem);
    });
}

// Show product details on the product page
function displayProductDetails() {
    const selectedBrand = localStorage.getItem('selectedBrand');
    const productDetailsDiv = document.getElementById('productDetails');
    const product = products[selectedBrand];

    if (product) {
        productDetailsDiv.innerHTML = `
            <div class="card">
                <h2>${product.name}</h2>
                <p>Distributor: ${product.distributor}</p>
                <p>Location: ${product.location}</p>
                <p>Contact: ${product.contact}</p>
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" min="1" value="1">
            </div>
        `;
    } else {
        productDetailsDiv.innerHTML = "<p>Product not found.</p>";
    }
}

// Add to cart functionality
function addToCart() {
    const quantity = document.getElementById('quantity').value;
    alert(`Added ${quantity} item(s) to the cart!`);
}
