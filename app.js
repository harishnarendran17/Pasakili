let cart = [];

function addToCart(product) {
    cart.push(product);
    alert(`${product} has been added to your cart.`);
    speak(`${product} added to cart.`);
}

function speak(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'en-US';  // You can change the language
    window.speechSynthesis.speak(msg);
}

function checkout() {
    speak("Please confirm your purchase.");
    alert("Checking out: " + cart.join(', '));
}

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartItems.appendChild(li);
    });
});
