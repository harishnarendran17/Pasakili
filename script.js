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
        brandItem.textContent = brand;
        brandItem.onclick = () => showProducts(brand); // Show products for selected brand
        brandList.appendChild(brandItem);
    });
}

// Show products for the selected brand
function showProducts(brand) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ""; // Clear product list

    if (products[brand]) {
        const product = products[brand];
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Distributor: ${product.distributor}</p>
            <p>Location: ${product.location}</p>
            <p>Contact: ${product.contact}</p>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" min="1" value="1">
            <button onclick="addToCart('${brand}')">Add to Cart</button>
        `;
        productList.appendChild(card);
    } else {
        productList.innerHTML = "<p>No products available</p>";
    }
}

// Function to add items to the cart
function addToCart(brand) {
    const quantity = document.getElementById('quantity').value;
    alert(`Added ${quantity} of ${brand} to cart!`);
}
