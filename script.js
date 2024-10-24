function addToCart(product, quantity) {
    const message = `You have added ${quantity} of ${product} to your cart.`;
    alert(message);
    // Implement voice feedback if needed
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
}
