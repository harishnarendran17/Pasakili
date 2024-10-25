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
    const retailerId = document.getElementById('retailer-id').value;
    if (retailerId === 'custom1234') {
        document.getElementById('location-selection').style.display = 'block';
        document.getElementById('retailer-login').style.display = 'none';
    } else {
        alert('Invalid ID. Please try again.');
    }
});

document.getElementById('location-select').addEventListener('change', function () {
    const selectedLocation = this.value;
    document.getElementById('brand-selection').innerHTML = ''; // Clear previous brands
    // Dummy data for brand selection based on the location
    const availableBrands = Object.keys(productData).map(brand => `<option value="${brand}">${brand}</option>`).join('');
    document.getElementById('brand-selection').innerHTML = availableBrands;
    document.getElementById('brand-list').style.display = 'block';
});

document.getElementById('brand-select').addEventListener('change', function () {
    const selectedBrand = this.value;
    const categories = Object.keys(productData[selectedBrand]);
    let categoryHtml = '<select id="category-select"><option>Select Category</option>';
    categories.forEach(category => {
        categoryHtml += `<option value="${category}">${category}</option>`;
    });
    categoryHtml += '</select>';
    document.getElementById('category-selection').innerHTML = categoryHtml;
    document.getElementById('category-selection').style.display = 'block';
});

document.getElementById('category-selection').addEventListener('change', function () {
    const selectedCategory = document.getElementById('category-select').value;
    const selectedBrand = document.getElementById('brand-select').value;
    const products = productData[selectedBrand][selectedCategory];
    let productHtml = '<div class="product-card">';
    products.forEach(product => {
        productHtml += `
        <div class="product-item">
            <h3>${product}</h3>
            <p>Distributor: Example Distributor</p>
            <p>Location: Example Location</p>
            <p>Contact: 1234567890</p>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" value="1" min="1">
            <button class="add-to-cart" onclick="addToCart('${product}')">Add to Cart</button>
        </div>`;
    });
    productHtml += '</div>';
    document.getElementById('product-details').innerHTML = productHtml;
    document.getElementById('product-page').style.display = 'block';
});

// Function to add product to cart
function addToCart(product) {
    alert(`${product} has been added to the cart.`);
}

// Adding background image to the body
document.body.style.backgroundImage = "url('background.jpg')";
