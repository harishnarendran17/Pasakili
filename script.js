function showBrands() {
    const location = document.getElementById('locationSelect').value;
    const brandList = document.getElementById('brandList');
    brandList.innerHTML = ""; // Clear previous brands
    
    if (distributors[location]) {
        distributors[location].forEach((distributor) => {
            distributor.brands.forEach((brand) => {
                const brandItem = document.createElement('li');
                brandItem.innerHTML = `<span onclick="showProducts('${distributor.name}', '${brand}')">${brand}</span>`;
                brandList.appendChild(brandItem);
            });
        });
    } else {
        brandList.innerHTML = "<li>No brands found for this location.</li>";
    }
}

// Function to navigate to the products page
function showProducts(distributorName, brand) {
    localStorage.setItem('selectedDistributor', distributorName);
    localStorage.setItem('selectedBrand', brand);
    window.location.href = 'products.html'; // Navigate to products page
}
