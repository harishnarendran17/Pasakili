// Updated data for distributors and their products
const distributorsData = {
    location1: {
        "Marico Limited": {
            brands: ["Parachute", "Nihar", "Livon", "Saffola", "Kaya"],
            products: {
                "Parachute": ["Parachute Coconut Oil", "Parachute Jasmine Oil"],
                "Nihar": ["Nihar Natural Oil", "Nihar Almond Hair Oil"],
                "Livon": ["Livon Hair Serum", "Livon Conditioning Oil"],
                "Saffola": ["Saffola Oil", "Saffola Oats"],
                "Kaya": ["Kaya Skin Products", "Kaya Hair Products"],
            }
        },
        "Dabur India Limited": {
            brands: ["Dabur Amla", "Dabur Vatika", "Dabur Honey", "Dabur Chyawanprash"],
            products: {
                "Dabur Amla": ["Dabur Amla Hair Oil", "Dabur Amla Shampoo"],
                "Dabur Vatika": ["Dabur Vatika Hair Oil", "Dabur Vatika Shampoo"],
                "Dabur Honey": ["Dabur Honey", "Dabur Honey with Ginger"],
                "Dabur Chyawanprash": ["Dabur Chyawanprash Classic", "Dabur Chyawanprash Sugar-Free"],
            }
        },
        "Colgate-Palmolive (India) Limited": {
            brands: ["Colgate", "Kissan"],
            products: {
                "Colgate": ["Colgate Toothpaste", "Colgate Sensitive"],
                "Kissan": ["Kissan Tomato Ketchup", "Kissan Fruit Jams"],
            }
        },
    },
    location2: {
        "ITC Limited": {
            brands: ["Aashirvaad", "Sunfeast", "Bingo!", "Bru"],
            products: {
                "Aashirvaad": ["Aashirvaad Atta", "Aashirvaad Salt"],
                "Sunfeast": ["Sunfeast Biscuit", "Sunfeast Pasta"],
                "Bingo!": ["Bingo! Chips", "Bingo! Mad Angles"],
                "Bru": ["Bru Instant Coffee", "Bru Ground Coffee"],
            }
        },
        "PepsiCo India": {
            brands: ["Pepsi", "Lay's"],
            products: {
                "Pepsi": ["Pepsi Regular", "Pepsi Diet"],
                "Lay's": ["Lay's Classic", "Lay's Magic Masala"],
            }
        },
        "Godrej Consumer Products Limited": {
            brands: ["Godrej Nupur", "Godrej No. 1"],
            products: {
                "Godrej Nupur": ["Godrej Nupur Henna", "Godrej Nupur Hair Color"],
                "Godrej No. 1": ["Godrej No. 1 Soap", "Godrej No. 1 Detergent"],
            }
        },
    }
};

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
    }
}

function showBrands(distributor, location) {
    const brandList = document.getElementById('brandList');
    brandList.innerHTML = ''; // Clear previous brands

    const locationData = distributorsData[location][distributor];
    locationData.brands.forEach(brand => {
        const li = document.createElement('li');
        li.textContent = brand;
        li.onclick = () => showProducts(brand, distributor, location);
        brandList.appendChild(li);
    });

    window.location.href = 'distributors.html'; // Redirect to brands page
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

    window.location.href = 'products.html'; // Redirect to products page
}

function addToCart(product) {
    alert(`${product} has been added to your cart!`);
}

function goBack() {
    window.history.back(); // Go back to the previous page
}
