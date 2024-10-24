// Sample retailer and distributor IDs for demonstration
const retailers = ['RET12345', 'RET67890'];
const distributors = ['DIST12345', 'DIST67890'];

function login(type) {
    const id = type === 'retailer' ? document.getElementById('retailer-id').value : document.getElementById('distributor-id').value;

    if (type === 'retailer') {
        if (retailers.includes(id)) {
            alert('Retailer login successful!');
            // Redirect to retailer dashboard or next step
            window.location.href = 'location.html'; // Example redirection
            return false; // Prevent form submission
        } else {
            alert('Invalid Retailer ID');
            return false; // Prevent form submission
        }
    } else {
        if (distributors.includes(id)) {
            alert('Distributor login successful!');
            // Redirect to distributor dashboard or next step
            window.location.href = 'distributor_dashboard.html'; // Example redirection
            return false; // Prevent form submission
        } else {
            alert('Invalid Distributor ID');
            return false; // Prevent form submission
        }
    }
}
