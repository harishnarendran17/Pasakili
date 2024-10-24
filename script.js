// Sample distributor data based on location for demonstration
const distributorsData = {
    location1: {
        'Distributor A': ['Product A1', 'Product A2'],
        'Distributor B': ['Product B1', 'Product B2'],
    },
    location2: {
        'Distributor C': ['Product C1', 'Product C2'],
        'Distributor D': ['Product D1', 'Product D2'],
    },
    location3: {
        'Distributor E': ['Product E1', 'Product E2'],
        'Distributor F': ['Product F1', 'Product F2'],
    },
};

// Redirect to location selection after retailer login
function redirectToLocation() {
    window.location.href = "location.html"; // Redirect to location selection page
    return false; // Prevent form submission
}

// Redirect to distributor page after distributor login
function redirectToDistributor() {
    window.location.href = "products.html"; // Redirect to products page
    return false; // Prevent form submission
}

// Show distributors based on selected location
function showDistributors() {
    const location = document.getElementById('location').value;
    const distributorList = document.getElementById('distributors');
    distributorList.innerHTML = ''; // Clear previous entries

    if (distributorsData[location]) {
        for (const distributor in distributorsData[location]) {
            const listItem = document.createElement('li');
            listItem.textContent = distributor;
            listItem.onclick = function() {
                showProducts(distributor, location); // Show products for selected distributor
            };
            distributorList.appendChild(listItem);
        }
        document.getElementById('distributor-list').style.display = 'block'; // Show the distributor list
    } else {
        alert('No distributors available for this location');
    }

    return false; // Prevent form submission
}

// Show products for selected distributor
function showProducts(distributor, location) {
    const productList = distributorsData[location][distributor];
    const productContainer = document.getElementById('product-list');

    // Clear previous product list
    productContainer.innerHTML = '';
    
    if (productList) {
        productList.forEach(product => {
            const productItem = document.createElement('li');
            productItem.textContent = product;
            productContainer.appendChild(productItem);
        });
        productContainer.style.display = 'block'; // Show the product list
    } else {
        alert('No products available for this distributor');
    }

    return false; // Prevent default behavior
}

// Function to show products after selecting a distributor
function displayProducts() {
    const productContainer = document.getElementById('product-list');
    productContainer.style.display = 'block'; // Show the product list
}
