const distributorData = {
    "Location1": [
        { name: "Distributor A", brand: ["Parachute", "Nihar"] },
        { name: "Distributor B", brand: ["Dabur Amla", "Dabur Vatika"] }
    ],
    "Location2": [
        { name: "Distributor C", brand: ["Colgate", "Palmolive"] },
        { name: "Distributor D", brand: ["Aashirvaad", "Sunfeast"] }
    ],
    "Location3": [
        { name: "Distributor E", brand: ["Pepsi", "Lay's"] },
        { name: "Distributor F", brand: ["Godrej Nupur", "Godrej Expert"] }
    ]
};

const productData = {
    "Distributor A": {
        "Parachute": ["Oil", "Cream"],
        "Nihar": ["Shampoo", "Conditioner"]
    },
    "Distributor B": {
        "Dabur Amla": ["Oil", "Herbal"],
        "Dabur Vatika": ["Shampoo", "Hair Mask"]
    },
    "Distributor C": {
        "Colgate": ["Toothpaste", "Toothbrush"],
        "Palmolive": ["Soap", "Shower Gel"]
    },
    "Distributor D": {
        "Aashirvaad": ["Atta", "Rice"],
        "Sunfeast": ["Biscuits", "Noodles"]
    },
    "Distributor E": {
        "Pepsi": ["Soft Drink", "Diet Pepsi"],
        "Lay's": ["Chips", "Snack"]
    },
    "Distributor F": {
        "Godrej Nupur": ["Hair Color", "Henna"],
        "Godrej Expert": ["Hair Color", "Cream"]
    }
};

function loginRetailer() {
    const retailerID = document.getElementById('retailerID').value;
    if (retailerID === 'custom1234') {
        window.location.href = 'location.html';
    } else {
        document.getElementById('error').innerText = 'Invalid Retailer ID!';
    }
}

function showDistributors() {
    const location = document.getElementById('locationSelect').value;
    const distributorList = document.getElementById('distributorList');

    distributorList.innerHTML = '';
    if (distributorData[location]) {
        distributorData[location].forEach(distributor => {
            const button = document.createElement('button');
            button.innerText = distributor.name;
            button.onclick = () => showProducts(distributor.name);
            distributorList.appendChild(button);
        });
    } else {
        distributorList.innerHTML = 'No distributors found.';
    }
}

function showProducts(distributorName) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    if (productData[distributorName]) {
        Object.keys(productData[distributorName]).forEach(brand => {
            const brandHeader = document.createElement('h2');
            brandHeader.innerText = brand;
            productList.appendChild(brandHeader);

            productData[distributorName][brand].forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerText = product;
                productList.appendChild(productDiv);
            });
        });
    } else {
        productList.innerHTML = 'No products available.';
    }
}
