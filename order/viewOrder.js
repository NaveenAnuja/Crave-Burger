document.addEventListener('DOMContentLoaded', function () {
    loadCategoryItems();
});

let orders = JSON.parse(localStorage.getItem('orderArray')) || [];

function loadCategoryItems() {
    let orders = JSON.parse(localStorage.getItem('orderArray')) || [];

    const tableBody = document.getElementById('vieworderbody');
  
    let body=``

    if (orders.length === 0) {
        alert("No items available.");
        return;
    }

  
    orders.forEach(order => {
        body += `
            <tr>
            <td>${order.orderId}</td>
            <td>${order.customerId}</td>
            <td>${order.itemTotal}</td>
            </tr>
        `;
        tableBody.innerHTML=body;
    });
}
