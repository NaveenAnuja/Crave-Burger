document.addEventListener('DOMContentLoaded', function () {
    displayOrderDate();
});

// Retrieve cartArray from localStorage
let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
let items = JSON.parse(localStorage.getItem('items')) || [];

// Function to display the current date
function displayOrderDate() {
    const today = new Date();
    const date = today.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
    document.getElementById('orderDate').value = date;
}

// Function to confirm order and display items from cart
function confirmOrder() {
    const orderItemsBody = document.getElementById('orderItemsBody');
    orderItemsBody.innerHTML = ''; // Clear existing table rows

    let subTotal = 0;
    let totalDiscount = 0;

    cartArray.forEach(order => {
        const selectedItem = items.find(item => item.id === order.itemId);
        if (selectedItem) {
            const itemTotal = parseFloat(order.itemTotal);
            const itemDiscount = parseFloat(selectedItem.discount);
            const discountAmount = itemTotal * (itemDiscount / 100);

            // Create a new row for each item
            const row = `
                <tr>
                    <td>${selectedItem.id}</td>
                    <td>${selectedItem.name}</td>
                    <td>${order.quantity}</td>
                    <td>${selectedItem.unitPrice.toFixed(2)}</td>
                    <td>${itemDiscount}%</td>
                    <td>${itemTotal.toFixed(2)}</td>
                </tr>
            `;
            orderItemsBody.insertAdjacentHTML('beforeend', row);

            subTotal += itemTotal;
            totalDiscount += discountAmount;
        }
    });

    const netTotal = subTotal - totalDiscount;

    // Update summary fields
    document.getElementById('subTotalInput').value = subTotal.toFixed(2);
    document.getElementById('discountInput').value = totalDiscount.toFixed(2);
    document.getElementById('netTotalInput').value = netTotal.toFixed(2);
}

// Place order function to simulate final confirmation
function confirmAll() {
    if (cartArray.length === 0) {
        alert("Your cart is empty. Please load the order first.");
        return;
    }
    
    alert("Order placed successfully!");
    
    // Clear cart and reset fields after placing order
    cartArray = [];
    localStorage.setItem('cartArray', JSON.stringify(cartArray));

    document.getElementById('orderItemsBody').innerHTML = '';
    document.getElementById('subTotalInput').value = '';
    document.getElementById('discountInput').value = '';
    document.getElementById('netTotalInput').value = '';
}

