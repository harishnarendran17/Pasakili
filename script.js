function loginRetailer() {
    const retailerId = document.getElementById('retailerId').value;
    if (retailerId === 'retailer123') {
        window.location.href = "location.html"; // Redirect to location selection
    } else {
        alert('Invalid Retailer ID. Please try again.');
    }
}

function showDistributors() {
    const locationSelect = document.getElementById('locationSelect');
    const distributorList = document.getElementById('distributorList');
    const distributors = document.getElementById('distributors');

    if (locationSelect.value) {
        distributorList.style.display = 'block';
        distributors.innerHTML = ''; // Clear previous list

        // Example distributors for selected locations
        if (locationSelect.value === 'location1') {
            distributors.innerHTML += `<li onclick="showProducts('Distributor A')">Distributor A</li>`;
            distributors.innerHTML += `<li onclick="showProducts('Distributor B')">Distributor B</li>`;
        } else if (locationSelect.value === 'location2') {
            distributors.innerHTML += `<li onclick="showProducts('Distributor C')">Distributor C</li>`;
            distributors.innerHTML += `<li onclick="showProducts('Distributor D')">Distributor D</li>`;
        }
    } else {
        distributorList.style.display = 'none';
    }
}

function showProducts(distributor) {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = ''; // Clear previous products

    if (distributor === 'Distributor A') {
        productsList.innerHTML += '<li>Product 1</li>';
        productsList.innerHTML += '<li>Product 2</li>';
    } else if (distributor === 'Distributor B') {
        productsList.innerHTML += '<li>Product 3</li>';
        productsList.innerHTML += '<li>Product 4</li>';
    } else if (distributor === 'Distributor C') {
        productsList.innerHTML += '<li>Product 5</li>';
        productsList.innerHTML += '<li>Product 6</li>';
    } else if (distributor === 'Distributor D') {
        productsList.innerHTML += '<li>Product 7</li>';
        productsList.innerHTML += '<li>Product 8</li>';
    }

    window.location.href = 'distributors.html'; // Redirect to products page
}

function goBack() {
    window.history.back(); // Go back to the previous page
}
