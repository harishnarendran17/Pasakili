document.getElementById('retailer-login').onsubmit = function(event) {
    event.preventDefault();
    window.location.href = "location.html"; // Redirect to location selection
};

document.getElementById('distributor-login').onsubmit = function(event) {
    event.preventDefault();
    // Redirect to distributor-specific page or functionality
};

document.getElementById('submit-location').onclick = function() {
    window.location.href = "distributor_selection.html"; // Redirect to distributor

