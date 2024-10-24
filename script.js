document.addEventListener('DOMContentLoaded', function () {
    const retailerId = "custom1234"; // Retailer login ID
    const distributorId = "dist1234"; // Distributor login ID
    const retailers = ["custom1234"];
    const distributors = ["dist1234"];

    // Retailer login
    document.getElementById('retailerLoginButton')?.addEventListener('click', function () {
        const id = document.getElementById('retailerId').value;
        if (retailers.includes(id)) {
            window.location.href = 'location.html';
        } else {
            document.getElementById('error').innerText = "Invalid Retailer ID!";
        }
    });

    // Distributor login
    document.getElementById('distributorLoginButton')?.addEventListener('click', function () {
        const id = document.getElementById('distributorId').value;
        if (distributors.includes(id)) {
            window.location.href = 'distributor_dashboard.html';
        } else {
            document.getElementById('error').innerText = "Invalid Distributor ID!";
        }
    });

    // Handling location selection
    document.getElementById('nextButton')?.addEventListener('click', function () {
        const selectedLocation = document.getElementById('locationSelect').value;
        if (selectedLocation) {
            showDistributors(selectedLocation);
        }
    });

    // Show distributors based on selected location
    function showDistributors(location) {
        const distributorList = document.getElementById('distributorList');
        distributorList.innerHTML = ''; // Clear previous list

        const distributors = {
            Location1: [
                { name: "Distributor A", brands: ["Marico", "Dabur"] },
                { name: "Distributor B", brands: ["Colgate", "ITC"] }
            ],
            Location2: [
                { name: "Distributor C", brands: ["PepsiCo", "Godrej"] },
                { name: "Distributor D", brands: ["Marico", "Dabur"] }
            ],
            Location3: [
                { name: "Distributor E", brands: ["Colgate", "ITC"] },
                { name: "Distributor F", brands: ["PepsiCo", "Godrej"] }
            ]
        };

        const selectedDistributors = distributors[location] || [];
        selectedDistributors.forEach(distributor => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${distributor.name}</strong> (${distributor.brands.join(', ')}) <button onclick="showProducts('${distributor.name}', '${location}')">View Products</button>`;
            distributorList.appendChild(div);
        });
    }

    // Show products based on selected distributor and location
    window.showProducts = function (distributorName, location) {
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Clear previous list

        const products = {
            "Distributor A": {
                "Marico": ["Parachute", "Nihar"],
                "Dabur": ["Dabur Amla", "Dabur Honey"]
            },
            "Distributor B": {
                "Colgate": ["Colgate Toothpaste", "Colgate Toothbrush"],
                "ITC": ["Aashirvaad", "Sunfeast"]
            },
            "Distributor C": {
                "PepsiCo": ["Pepsi", "Lays"],
                "Godrej": ["Godrej Nupur", "Godrej Expert"]
            },
            // Add more products for other distributors here...
        };

        const selectedProducts = products[distributorName] || {};
        for (const brand in selectedProducts) {
            const brandDiv = document.createElement('div');
            brandDiv.innerHTML = `<h3>${brand}</h3>`;
            selectedProducts[brand].forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `${product} <button onclick="addToCart('${product}')">Add to Cart</button>`;
                brandDiv.appendChild(productDiv);
            });
            productList.appendChild(brandDiv);
        }
    };

    // Function to add products to cart
    window.addToCart = function (product) {
        alert(`${product} has been added to your cart!`);
        // Add cart functionality here...
    };
});
