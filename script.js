document.addEventListener('DOMContentLoaded', function () {
    const retailerId = "custom1234"; // Retailer login ID
    const distributors = ["dist1234"];
    let totalItemsInCart = 0; // Track total items in cart

    // Retailer login
    document.getElementById('retailerLoginButton')?.addEventListener('click', function () {
        const id = document.getElementById('retailerId').value;
        if (id === retailerId) {
            window.location.href = 'location.html';
        } else {
            document.getElementById('error').innerText = "Invalid Retailer ID!";
        }
    });

    // Distributor login
    document.getElementById('distributorLoginButton')?.addEventListener('click', function () {
        const id = document.getElementById('distributorId').value;
        if (distributors.includes(id)) {
            alert("Logged in as Distributor");
        } else {
            document.getElementById('error').innerText = "Invalid Distributor ID!";
        }
    });

    // Handling location selection
    document.getElementById('nextButton')?.addEventListener('click', function () {
        const selectedLocation = document.getElementById('locationSelect').value;
        if (selectedLocation) {
            localStorage.setItem('selectedLocation', selectedLocation);
            showDistributors(selectedLocation);
        }
    });

    // Show distributors based on selected location
    function showDistributors(location) {
        window.location.href = 'distributor.html'; // Navigate to distributor page
    }

    // On distributor page load
    const selectedLocation = localStorage.getItem('selectedLocation');
    if (selectedLocation) {
        displayDistributors(selectedLocation);
    }

    function displayDistributors(location) {
        const distributorList = document.getElementById('distributorList');
        distributorList.innerHTML = ''; // Clear previous list

        const distributors = {
            Location1: ["Distributor A", "Distributor B"],
            Location2: ["Distributor C", "Distributor D"],
            Location3: ["Distributor E", "Distributor F"]
        };

        const selectedDistributors = distributors[location] || [];
        selectedDistributors.forEach(distributor => {
            const div = document.createElement('div');
            div.innerHTML = `${distributor} <button onclick="showProducts('${distributor}')">View Products</button>`;
            distributorList.appendChild(div);
        });
    }

    // Show products based on selected distributor
    window.showProducts = function (distributorName) {
        localStorage.setItem('selectedDistributor', distributorName);
        window.location.href = 'products.html'; // Navigate to products page
    };

    // On products page load
    const selectedDistributor = localStorage.getItem('selectedDistributor');
    if (selectedDistributor) {
        displayProducts(selectedDistributor);
    }

    function displayProducts(distributorName) {
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Clear previous list

        const products = {
            "Distributor A": {
                "Marico Limited": [
                    "Parachute", "Nihar", "Livon", "Zatak", 
                    "Saffola", "Coco Soul", "Kaya", "Sundrop", "Revive"
                ],
                "Dabur India Limited": [
                    "Dabur Amla", "Dabur Vatika", "Dabur Almond", 
                    "Dabur Chyawanprash", "Dabur Honey", "Dabur Ghee"
                ],
                "Colgate-Palmolive (India) Limited": [
                    "Colgate", "Colgate Sensitive", "Colgate Visible White", 
                    "Palmolive", "Kissan", "Knorr"
                ],
                "ITC Limited": [
                    "Aashirvaad", "Sunfeast", "Bingo!", "Yippee!"
                ],
                "PepsiCo India": [
                    "Pepsi", "Mirinda", "7 Up", "Mountain Dew"
                ],
                "Godrej Consumer Products Limited": [
                    "Godrej Nupur", "Godrej Expert", "Godrej Renew"
                ]
            },
            "Distributor B": {
                "Marico Limited": [
                    "Parachute", "Nihar", "Livon", "Zatak"
                ],
                "Dabur India Limited": [
                    "Dabur Amla", "Dabur Vatika", "Dabur Almond"
                ],
                // Add more brands and products as needed
            },
            // Add more distributors and their products here
        };

        const selectedProducts = products[distributorName] || {};
        for (const [brand, productArray] of Object.entries(selectedProducts)) {
            const brandDiv = document.createElement('div');
            brandDiv.innerHTML = `<h3>${brand}</h3>`;
            productArray.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    ${product} 
                    <input type="number" min="1" value="1" id="${product}-quantity" style="width: 50px;"/> 
                    <button onclick="addToCart('${product}')">Add to Cart</button>
                `;
                brandDiv.appendChild(productDiv);
            });
            productList.appendChild(brandDiv);
        }
    }

    // Function to add products to cart
    window.addToCart = function (product) {
        const quantity = parseInt(document.getElementById(`${product}-quantity`).value) || 1;
        totalItemsInCart += quantity; // Update total items in cart
        document.getElementById('cartMessage').innerText = `You have added ${totalItemsInCart} item(s) to the cart.`;
        alert(`${quantity} of ${product} has been added to your cart!`);
    };

    // Back navigation buttons
    document.getElementById('backToLocationButton')?.addEventListener('click', function () {
        window.location.href = 'location.html'; // Go back to location page
    });

    document.getElementById('backToDistributorButton')?.addEventListener('click', function () {
        window.location.href = 'distributor.html'; // Go back to distributor page
    });
});
