document.addEventListener("DOMContentLoaded", function () {
    const retailerLoginButton = document.getElementById("retailerLoginButton");
    const distributorLoginButton = document.getElementById("distributorLoginButton");
    const locationButton = document.getElementById("locationButton");

    // Retailer Login
    if (retailerLoginButton) {
        retailerLoginButton.addEventListener("click", function () {
            const retailerIdInput = document.getElementById("retailerId").value;

            if (retailerIdInput === "1234") {
                alert("Retailer logged in successfully!");
                window.location.href = "location.html";
            } else {
                alert("Invalid Retailer ID. Please enter '1234' to login.");
            }
        });
    }

    // Distributor Login
    if (distributorLoginButton) {
        distributorLoginButton.addEventListener("click", function () {
            const distributorIdInput = document.getElementById("distributorId").value;

            if (distributorIdInput === "custom1234") {
                alert("Distributor logged in successfully!");
                window.location.href = "distributors.html";
            } else {
                alert("Invalid Distributor ID. Please enter 'custom1234' to login.");
            }
        });
    }

    // Location Selection
    if (locationButton) {
        locationButton.addEventListener("click", function () {
            const selectedLocation = document.getElementById("locationSelect").value;
            alert("Location selected: " + selectedLocation);
            window.location.href = "distributors.html"; // Redirect to distributors page
        });
    }
});
