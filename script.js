document.getElementById('retailerLogin').addEventListener('click', function() {
    const retailerId = document.getElementById('retailerId').value;
    if (retailerId) {
        alert('Logged in as Retailer: ' + retailerId);
        document.getElementById('locationDiv').style.display = 'block';
    } else {
        alert('Please enter a Retailer ID.');
    }
});

document.getElementById('showDistributors').addEventListener('click', function() {
    const location = document.getElementById('locationSelect').value;
    if (location) {
        // Populate distributor options based on the selected location
        // Example: In real implementation, you'd fetch this data from a database
        const distributors = ['Distributor A', 'Distributor B'];
        const distributorSelect = document.getElementById('distributorSelect');
        distributorSelect.innerHTML = ''; // Clear previous options
        distributors.forEach(distributor => {
            const option = document.createElement('option');
            option.value = distributor;
            option.textContent = distributor;
            distributorSelect.appendChild(option);
        });
        document.getElementById('distributorDiv').style.display = 'block';
    } else {
        alert('Please select a location.');
    }
});

document.getElementById('showProducts').addEventListener('click', function() {
    const distributor = document.getElementById('distributorSelect').value;
    if (distributor) {
        // Example product list
        const products = ['Product 1', 'Product 2'];
        let productListHtml = '';
        products.forEach(product => {
            productListHtml += `<li>${product} <button onclick="addToCart('${product}')">Add to Cart</button></li>`;
        });
        document.getElementById('productsList').innerHTML = productListHtml;
        alert('Products listed for ' + distributor);
    } else {
        alert('Please select a distributor.');
    }
});

function addToCart(product) {
    alert(product + ' has been added to the cart.');
}
