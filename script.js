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
    const brandList = document.getElementById('brandList');
    
    distributorList.innerHTML = ""; // Clear distributor list
    brandList.innerHTML = ""; // Clear brand list

    if (distributors[location]) {
        distributors[location].forEach((distributor) => {
            const distributorItem = document.createElement('li');
            distributorItem.className = 'distributor-item';
            distributorItem.innerHTML = `
                <span>${distributor.name} - Brands: ${distributor.brands.length}</span>
            `;
            distributorItem.onclick = () => showBrands(distributor.brands);
            distributorList.appendChild(distributorItem);
        });
    } else {
        distributorList.innerHTML = "<li>No distributors available</li>";
    }
}

// Show brands based on selected distributor
function showBrands(brands) {
    const brandList = document.getElementById('brandList');
    brandList.innerHTML = ""; // Clear brand list

    brands.forEach((brand) => {
        const brandItem = document.createElement('li');
        brandItem.className = 'brand-item';
        brandItem.innerHTML = brand; // Display brand name
        brandItem.onclick = () => {
            // Save the selected brand to local storage and redirect to the product page
            localStorage.setItem('selectedBrand', brand);
            window.location.href = 'products.html';
        };
        brandList.appendChild(brandItem);
    });
}

// Display products based on the selected brand
function displayProducts() {
    const brand = localStorage.getItem('selectedBrand');
    const productList = document.getElementById('productList');
    productList.innerHTML = ""; // Clear list

    // Check if the product exists
    if (products[brand]) {
        const productDetails = `
            <li>
                <h2>${products[brand].name}</h2>
                <p>Distributor: ${products[brand].distributor}</p>
                <p>Contact: ${products[brand].contact}</p>
                <p>Location: ${products[brand].location}</p>
                <input type="number" id="quantity" value="1" min="1" placeholder="Quantity">
                <button onclick="addToCart('${brand}')">Add to Cart</button>
            </li>
        `;
        productList.innerHTML = productDetails;
    } else {
        alert('Product not found');
    }
}

// Add selected product to cart
function addToCart(brand) {
    const quantity = document.getElementById('quantity').value;
    alert(`${quantity} of ${brand} added to cart`);
}
