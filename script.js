// Retailer IDs with their names
const retailers = {
    "custom1234": { name: "Retailer 1" }
};

// Sample distributors and their brands based on locations
const distributors = {
    "Mumbai": [
        { name: "Distributor A", brands: ["Parachute", "Nihar"] },
        { name: "Distributor B", brands: ["Dabur Amla", "Dabur Honey"] }
    ],
    "Delhi": [
        { name: "Distributor C", brands: ["Colgate", "Palmolive"] },
        { name: "Distributor D", brands: ["ITC", "Bru"] }
    ],
    "Bangalore": [
        { name: "Distributor E", brands: ["Pepsi", "Lay's"] },
        { name: "Distributor F", brands: ["Godrej Nupur", "Godrej FairGlow"] }
    ]
};

// This will hold the products related to the selected brand
let products = [];

// Function to handle retailer login
function loginRetailer() {
    // Get the input value for retailer ID
    const retailerId = document.getElementById('retailerId').value;

    // Check if the retailer ID exists in our retailers object
    if (retailerId in retailers) {
        // Redirect to the location selection page
        window.location.href = "location.html";
    } else {
        // Show an error message if the ID is invalid
        document.getElementById('loginError').innerText = "Invalid Retailer ID!";
    }
}

// Function to show distributors based on selected location
function showDistributors() {
    const location = document.getElementById('locationSelect').value; // Get the selected location
    const distributorsList = document.getElementById('distributorsList'); // Get the list element

    // Clear the previous distributors
    distributorsList.innerHTML = "";

    // Check if a location is selected
    if (location) {
        // Show the distributors section
        distributorsList.parentElement.style.display = "block";

        // Loop through the distributors for the selected location
        distributors[location].forEach(distributor => {
            // Create a list item for each distributor
            const li = document.createElement('li');
            li.textContent = distributor.name;
            // Set the click event to show brands for the selected distributor
            li.onclick = () => showBrands(location, distributor.name);
            distributorsList.appendChild(li); // Add to the list
        });
    } else {
        // Hide the distributors section if no location is selected
        distributorsList.parentElement.style.display = "none";
    }
}

// Function to show brands of the selected distributor
function showBrands(location, distributorName) {
    // Redirect to the distributors page
    window.location.href = "distributors.html";
    
    const brandsList = document.getElementById('distributorBrandsList'); // Get the list element
    brandsList.innerHTML = ""; // Clear the previous brands

    // Find the selected distributor
    const distributor = distributors[location].find(d => d.name === distributorName);
    if (distributor) {
        // Loop through the brands and create a list item for each
        distributor.brands.forEach(brand => {
            const li = document.createElement('li');
            li.textContent = brand;
            // Set the click event to show products for the selected brand
            li.onclick = () => showProducts(brand);
            brandsList.appendChild(li);
        });
    }
}

// Function to show products based on the selected brand
function showProducts(brand) {
    // Sample products for demonstration
    products = [
        { name: "Product 1 from " + brand, price: 100 },
        { name: "Product 2 from " + brand, price: 200 },
        { name: "Product 3 from " + brand, price: 150 }
    ];

    // Redirect to the products page
    window.location.href = "products.html";
    
    const productsList = document.getElementById('productsList'); // Get the list element
    productsList.innerHTML = ""; // Clear the previous products

    // Loop through the products and create a list item for each
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;
        productsList.appendChild(li); // Add to the list
    });
}

// Function to add selected product to cart
function addToCart() {
    const quantity = document.getElementById('productQuantity').value; // Get the quantity
    if (quantity && quantity > 0) {
        alert("Added " + quantity + " of " + products[0].name + " to the cart.");
        // You can implement cart logic here, like saving to localStorage or a server.
        window.location.href = "cart.html"; // Redirect to the cart page
    } else {
        alert("Please enter a valid quantity.");
    }
}
