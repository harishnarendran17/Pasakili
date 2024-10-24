const distributorsData = {
    location1: {
        "Marico Limited": {
            brands: ["Parachute", "Nihar", "Livon"],
            products: {
                "Parachute": ["Parachute Coconut Oil", "Parachute Jasmine Oil"],
                "Nihar": ["Nihar Natural Oil", "Nihar Almond Hair Oil"],
                "Livon": ["Livon Hair Serum", "Livon Conditioning Oil"],
            }
        },
        "Dabur India Limited": {
            brands: ["Dabur Amla", "Dabur Vatika"],
            products: {
                "Dabur Amla": ["Dabur Amla Hair Oil", "Dabur Amla Shampoo"],
                "Dabur Vatika": ["Dabur Vatika Hair Oil", "Dabur Vatika Shampoo"],
            }
        }
    },
    location2: {
        "ITC Limited": {
            brands: ["Aashirvaad", "Sunfeast"],
            products: {
                "Aashirvaad": ["Aashirvaad Atta", "Aashirvaad Salt"],
                "Sunfeast": ["Sunfeast Biscuit", "Sunfeast Pasta"],
            }
        },
        "PepsiCo India": {
            brands: ["Lay's", "Pepsi"],
            products: {
                "Lay's": ["Lay's Classic", "Lay's Magic Masala"],
                "Pepsi": ["Pepsi Regular", "Pepsi Diet"],
            }
        }
    }
};

function showDistributors() {
    const locationSelect = document.getElementById('locationSelect');
    const distributorList = document.getElementById('distributorList');
    const distributors = document.getElementById('distributors');
    const brandList = document.getElementById('brandList');
    const brands = document.getElementById('brands');

    if (locationSelect.value) {
        distributorList.style.display = 'block';
        distributors.innerHTML = ''; // Clear previous list
        brandList.style.display = 'none'; // Hide brand list

        const selectedLocation = locationSelect.value;
        const locationData = distributorsData[selectedLocation];

        for (const distributor in locationData) {
            const li = document.createElement('li');
            li.textContent = distributor;
            li.onclick = () => showBrands(distributor, selectedLocation);
            distributors.appendChild(li);
        }
    } else {
        distributorList.style.display = 'none';
        brandList.style.display = 'none';
    }
}

function showBrands(distributor, location) {
    const brandList = document.getElementById('brandList');
    const brands = document.getElementById('brands');
    const distributorList = document.getElementById('distributorList');

    brandList.style.display = 'block';
    brands.innerHTML = ''; // Clear previous brands

    const locationData = distributorsData[location][distributor];
    locationData.brands.forEach(brand => {
        const li = document.createElement('li');
        li.textContent = brand;
        li.onclick = () => showProducts(brand, distributor, location);
        brands.appendChild(li);
    });

    distributorList.style.display = 'none'; // Hide distributor list
}

function showProducts(brand, distributor, location) {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = ''; // Clear previous products

    const locationData = distributorsData[location][distributor];
    const products = locationData.products[brand];

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product;
        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.onclick = () => addToCart(product);
        li.appendChild(addButton);
        productsList.appendChild(li);
    });

    // Redirect to products page
    window.location.href = 'products.html';
}

function addToCart(product) {
    alert(`${product} has been added to your cart!`);
}

function goBack() {
    window.history.back(); // Go back to the previous page
}
