// Product Data
const productData = {
    "Hindustan Unilever Limited (HUL)": {
        "Soaps": ["Lux", "Lifebuoy", "Rin", "Wheel", "Dove", "Pears", "Ciptadent"],
        "Shampoos": ["Sunsilk", "Clinic Plus", "Pantene", "Head & Shoulders", "TRESemmé"],
        "Skin care": ["Fair & Lovely", "Ponds", "Lakme", "Vaseline", "Dove"],
        "Foods": ["Kissan", "Knorr", "Lipton", "Brooke Bond", "Bru"],
        "Beverages": ["Bru", "Brooke Bond", "Lipton", "Taj Mahal"],
        "Others": ["Axe", "Closeup", "Pepsodent", "Clear", "Domex"]
    },
    "Procter & Gamble India (P&G)": {
        "Soaps": ["Ariel", "Tide", "Pantene", "Head & Shoulders", "Olay"],
        "Shampoos": ["Pantene", "Head & Shoulders", "TRESemmé", "Aussie"],
        "Skin care": ["Olay", "Ponds", "Vaseline", "Gillette"],
        "Foods": ["Pampers", "Oral-B", "Gillette"],
        "Beverages": ["Ambi Pur"],
        "Others": ["Ariel", "Tide", "Whirlpool", "Duracell"]
    },
    "Marico Limited": {
        "Hair care": ["Parachute", "Nihar", "Livon", "Zatak"],
        "Skin care": ["Nihar", "Parachute", "Livon"],
        "Foods": ["Saffola", "Coco Soul"],
        "Others": ["Kaya", "Sundrop", "Revive"]
    },
    "Dabur India Limited": {
        "Hair care": ["Dabur Amla", "Dabur Vatika", "Dabur Almond"],
        "Skin care": ["Dabur Gulabari", "Dabur Uveda", "Dabur Herbal"],
        "Foods": ["Dabur Chyawanprash", "Dabur Honey", "Dabur Ghee"],
        "Beverages": ["Dabur Juices", "Dabur Sharbat"],
        "Others": ["Dabur Ayurvedic", "Dabur Nature Care"]
    },
    "Colgate-Palmolive (India) Limited": {
        "Oral care": ["Colgate", "Colgate Sensitive", "Colgate Visible White"],
        "Personal care": ["Palmolive", "Palmolive Men", "Palmolive Women"],
        "Foods": ["Kissan", "Knorr"],
        "Others": ["Colgate Toothpowder", "Colgate Toothbrush", "Palmolive Soap"]
    },
    "ITC Limited": {
        "Foods": ["Aashirvaad", "Sunfeast", "Bingo!", "Yippee!"],
        "Beverages": ["Bru", "Wills", "Gold Flake"],
        "Personal care": ["Fiama", "Vivel", "Savlon"],
        "Others": ["ITC Paperboards", "ITC Packaging", "ITC Agri Business"]
    },
    "PepsiCo India": {
        "Beverages": ["Pepsi", "Mirinda", "7 Up", "Mountain Dew"],
        "Foods": ["Lay's", "Kurkure", "Cheetos", "SunChips"],
        "Others": ["PepsiCo India Foundation", "PepsiCo Sustainability"]
    },
    "Godrej Consumer Products Limited": {
        "Hair care": ["Godrej Nupur", "Godrej Expert", "Godrej Renew"],
        "Skin care": ["Godrej No. 1", "Godrej FairGlow", "Godrej Insta Fair"],
        "Foods": ["Godrej Kitchens", "Godrej Interio"],
        "Others": ["Godrej Aer", "Godrej Protekt", "Godrej HIT"]
    }
};

// Event Listeners
document.getElementById('retailer-login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const retailerId = document.getElementById('retailer-id').value; // Retrieve retailer ID
    if (retailerId === 'custom1234') {
        document.getElementById('location-selection').style.display = 'block'; // Show location selection
        document.getElementById('retailer-login').style.display = 'none'; // Hide retailer login
    } else {
        alert('Invalid ID. Please try again.'); // Show error for invalid ID
    }
});

document.getElementById('location-select').addEventListener('change', function () {
    const selectedLocation = this.value; // Get selected location
    document.getElementById('brand-selection').innerHTML = ''; // Clear previous brands
    // Dummy data for brand selection based on the location
    const availableBrands = Object.keys(productData);
    availableBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        document.getElementById('brand-select').appendChild(option); // Populate brand select
    });
    document.getElementById('brand-list').style.display = 'block'; // Show brand selection
});

document.getElementById('brand-select').addEventListener('change', function () {
    const selectedBrand = this.value; // Get selected brand
    const categories = Object.keys(productData[selectedBrand]); // Get categories of the selected brand
    document.getElementById('category-selection').innerHTML = ''; // Clear previous categories
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.onclick = () => showProducts(selectedBrand, category);
        document.getElementById('category-selection').appendChild(button); // Populate category selection
    });
    document.getElementById('category-selection').style.display = 'block'; // Show category selection
});

function showProducts(brand, category) {
    const products = productData[brand][category]; // Get products of selected brand and category
    document.getElementById('product-page').innerHTML = ''; // Clear previous products
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <h3>${product}</h3>
            <p>Brand: ${brand}</p>
            <button>Add to Cart</button>
        `;
        document.getElementById('product-page').appendChild(productDiv); // Populate product details
    });
    document.getElementById('product-details').style.display = 'block'; // Show product details
}
