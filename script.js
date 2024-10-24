document.getElementById('retailer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('location-section').style.display = 'block';
    alert('Retailer logged in successfully!');
});

function showDistributors() {
    const location = document.getElementById('location-select').value;
    const distributors = {
        location1: [
            { name: 'Distributor A', brands: ['Marico Limited', 'Dabur India Limited'] },
            { name: 'Distributor B', brands: ['Colgate-Palmolive', 'ITC Limited'] }
        ],
        location2: [
            { name: 'Distributor C', brands: ['PepsiCo India', 'Godrej Consumer Products'] }
        ],
        location3: [
            { name: 'Distributor D', brands: ['Marico Limited', 'PepsiCo India'] }
        ]
    };

    const selectedDistributors = distributors[location];
    const distributorsList = document.getElementById('distributors-list');
    distributorsList.innerHTML = '';

    selectedDistributors.forEach(distributor => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${distributor.name}</h3>
            <h4>Brands:</h4>
            <ul>
                ${distributor.brands.map(brand => `<li>${brand} <button onclick="showProducts('${distributor.name}', '${brand}')">View Products</button></li>`).join('')}
            </ul>
        `;
        distributorsList.appendChild(div);
    });

    document.getElementById('distributors-section').style.display = 'block';
}

function showProducts(distributorName, brand) {
    const products = {
        'Distributor A': {
            'Marico Limited': ['Parachute', 'Nihar'],
            'Dabur India Limited': ['Dabur Amla', 'Dabur Vatika']
        },
        'Distributor B': {
            'Colgate-Palmolive': ['Colgate', 'Palmolive'],
            'ITC Limited': ['Aashirvaad', 'Sunfeast']
        },
        'Distributor C': {
            'PepsiCo India': ['Pepsi', 'Lay\'s'],
            'Godrej Consumer Products': ['Godrej No. 1', 'Godrej Expert']
        },
        'Distributor D': {
            'Marico Limited': ['Saffola'],
            'PepsiCo India': ['Kurkure']
        }
    };

    const selectedProducts = products[distributorName][brand];
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    selectedProducts.forEach(product => {
        const div = document.createElement('div');
        div.innerHTML = `
            ${product}
            <input type="number" min="1" value="1" id="${product}-quantity">
            <button onclick="addToCart('${product}', document.getElementById('${product}-quantity').value)">Add to Cart</button>
        `;
        productsList.appendChild(div);
    });

    document.getElementById('products').style.display = 'block';
}

function addToCart(product, quantity) {
    const message = `You have added ${quantity} of ${product} to your cart.`;
    alert(message);
    // Voice feedback
    const utterance = new SpeechSynthesisUtterance(`You have added ${quantity} of ${product} to your cart.`);
    window.speechSynthesis.speak(utterance);
}
