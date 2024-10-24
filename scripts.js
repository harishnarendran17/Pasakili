function login(userType) {
    if (userType === 'retailer') {
        document.getElementById('retailer-section').classList.remove('hidden');
        document.getElementById('distributor-section').classList.add('hidden');
    } else {
        document.getElementById('distributor-section').classList.remove('hidden');
        document.getElementById('retailer-section').classList.add('hidden');
    }
}

function addToCart(item) {
    alert(`Added to cart: ${item}`);
    const cartItems = document.getElementById('cart-items');
    const newItem = document.createElement('div');
    newItem.textContent = item;
    cartItems.appendChild(newItem);
}

function checkout() {
    alert('Checkout confirmed!');
}
