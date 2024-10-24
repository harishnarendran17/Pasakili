let cart = [];

function addToCart(product, quantity) {
    // Add the product and quantity to the cart
    cart.push({ product, quantity });
    
    // Voice out the product name and the quantity added
    const message = `${quantity} units of ${product} have been added to your cart.`;
    alert(message);  // Optional: Display an alert as well
    speak(message);
}

function speak(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'en-US';  // You can change the language if needed
    window.speechSynthesis.speak(msg);
}

function checkout() {
    speak("Please confirm your purchase.");
    alert("Checking out: " + cart.map(item => `${item.quantity} of ${item.product}`).join(', '));
}

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.quantity} x ${item.product}`;
        cartItems.appendChild(li);
    });
});
