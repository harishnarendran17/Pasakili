document.getElementById('retailer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('products').style.display = 'block';
    alert('Retailer logged in successfully!');
});

document.getElementById('distributor-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('orders').style.display = 'block';
    alert('Distributor logged in successfully!');
});

function addToCart(product, quantity) {
    const message = `You have added ${quantity} of ${product} to your cart.`;
    alert(message);
    // Voice feedback
    const utterance = new SpeechSynthesisUtterance(`You have added ${quantity} of ${product} to your cart.`);
    window.speechSynthesis.speak(utterance);
}
