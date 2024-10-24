function loginRetailer() {
    // Logic for retailer login
    window.location.href = "location.html"; // Redirect to location selection
}

function loginDistributor() {
    // Logic for distributor login
    window.location.href = "distributors.html"; // Redirect to distributors list
}

function showDistributors() {
    // Mock data for distributors based on location
    const distributors = {
        location1: [
            { name: "Distributor A", brand: "Brand 1" },
            { name: "Distributor B", brand: "Brand 2" }
        ],
        location2: [
            { name: "Distributor C", brand: "Brand 3" },
            { name: "Distributor D", brand: "Brand 4" }
        ]
    };

    const selectedLocation = document.getElementById('locationSelect').value;
    const distributorsList = document.getElementById('distributorsList');

    if (distributors[selectedLocation]) {
        distributorsList.innerHTML = '';
        distributors[selectedLocation].forEach(dist => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" onclick="showProducts('${dist.brand}')">${dist.name} - ${dist.brand}</a>`;
            distributorsList.appendChild(li);
        });
    }
}

function showProducts(brand) {
    // Mock data for products based on distributor's brand
    const products = {
        "Brand 1": ["Product A1", "Product A2"],
        "Brand 2": ["Product B1", "Product B2"],
        "Brand 3": ["Product C1", "Product C2"],
        "Brand 4": ["Product D1", "Product D2"]
    };

    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    products[brand].forEach(product => {
        const li = document.createElement('li');
        li.textContent = product;
        productsList.appendChild(li);
    });
}

function addToCart() {
    const quantity = document.getElementById('quantity').value;
    if (quantity > 0) {
        alert(`Added ${quantity} item(s) to the cart!`);
    } else {
        alert('Please enter a valid quantity.');
    }
}
