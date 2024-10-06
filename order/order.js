document.addEventListener('DOMContentLoaded', function () {
    populateOrderTable();
    generateOrderId();
});
let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let items = JSON.parse(localStorage.getItem('items')) || [];
let orderCount = JSON.parse(localStorage.getItem('orderCount')) || 0;


function generateOrderId() {
    orderCount++;
    let id = "P" + orderCount.toString().padStart(4, '0');
    console.log(id);
    document.getElementById("orderId").value = id;
    localStorage.setItem('orderCount', JSON.stringify(orderCount));
}



function customerComboBox() {
    const customerSelect = document.getElementById("customerName");
    customerSelect.innerHTML = "<option value=''>Select Customer</option>";
    customers.forEach(customer => {
        const option = document.createElement("option");
        option.value = customer.id;
        option.text = customer.name;
        customerSelect.appendChild(option);
    });
}

customerComboBox();

document.getElementById("customerName").addEventListener("change", () => {
    const selectedCustomerId = document.getElementById("customerName").value;
    document.getElementById('customerId').value = selectedCustomerId;
});

function itemComboBox() {
    const itemSelect = document.getElementById("itemName");
    itemSelect.innerHTML = "<option value=''>Select Item</option>";
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.name;
        itemSelect.appendChild(option);
    });
}

itemComboBox();

document.getElementById("itemName").addEventListener("change", () => {
    const selectedItemId = document.getElementById("itemName").value;
    const selectedItem = items.find(item => item.id === selectedItemId);
    if (selectedItem) {
        document.getElementById('itemId').value = selectedItemId;
        document.getElementById('price').value = selectedItem.unitPrice.toFixed(2);
        document.getElementById('discount').value = selectedItem.discount + "%";
        document.getElementById('quantity').value = '';
    }
});

document.getElementById('quantity').addEventListener('input', calculateTotal);

function calculateTotal() {
    let price = parseFloat(document.getElementById('price').value) || 0;
    let qty = parseFloat(document.getElementById('quantity').value) || 0;
    let discount = parseFloat(document.getElementById('discount').value) || 0;

    let total = (qty * price) - (qty * price * discount / 100);
    let disc = (qty * price * discount / 100);

    document.getElementById('disc').value = disc.toFixed(2);
    document.getElementById('itemTotal').value = total.toFixed(2);
    updateNetTotalDisplay();
}

function updateNetTotalDisplay() {
    let totalNet = 0;

    cartArray.forEach(order => {
        totalNet += parseFloat(order.itemTotal);
    });

    document.getElementById('netTotal').value = totalNet.toFixed(2);
}

function addToCart() {
    const orderId = document.getElementById('orderId').value;
    const customerId = document.getElementById('customerId').value;
    const itemId = document.getElementById('itemId').value;
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const itemTotal = parseFloat(document.getElementById('itemTotal').value) || 0;

    if (!customerId) {
        alert("Please select a customer!");
        return;
    }

    if (itemId && quantity > 0) {
        const orderItem = {
            orderId,
            customerId,
            itemId,
            quantity,
            itemTotal
        };

        cartArray.push(orderItem);
        console.log(cartArray);
        localStorage.setItem('cartArray', JSON.stringify(cartArray));
        alert("Item added to cart!");
        resetForm();
    } else {
        alert("Please select an item and enter a quantity.");
    }
}

function resetForm() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemId').value = '';
    document.getElementById('discount').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('itemTotal').value = '';
    document.getElementById('disc').value = '';
}

let orderArray = JSON.parse(localStorage.getItem('orderArray')) || [];

function confirmOrder() {
    let cart={
        customerId:null,
        orderId:null,
        itemTotal:null
    };
    cartArray.forEach(element => {
        cart.customerId=element.customerId;
        cart.orderId=element.orderId;
        cart.itemTotal=element.itemTotal;
    });
    orderArray.push(cart) ;
    
    localStorage.setItem('orderArray', JSON.stringify(orderArray));

    const orderItemsBody = document.getElementById("orderItemsBody");
    orderItemsBody.innerHTML = '';

    let subTotal = 0;
    let totalDiscount = 0;

    cartArray.forEach(item => {
        const row = document.createElement("tr");

        const itemIdCell = document.createElement("td");
        itemIdCell.textContent = item.itemId;
        row.appendChild(itemIdCell);

        const itemNameCell = document.createElement("td");
        const itemDetail = items.find(i => i.id === item.itemId);
        itemNameCell.textContent = itemDetail ? itemDetail.name : '';
        row.appendChild(itemNameCell);

        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        const unitPriceCell = document.createElement("td");
        unitPriceCell.textContent = itemDetail ? itemDetail.unitPrice.toFixed(2) : '0.00';
        row.appendChild(unitPriceCell);

        const discountCell = document.createElement("td");
        discountCell.textContent = itemDetail ? itemDetail.discount + "%" : '0%';
        row.appendChild(discountCell);

        const totalCell = document.createElement("td");
        totalCell.textContent = item.itemTotal.toFixed(2);
        row.appendChild(totalCell);

        orderItemsBody.appendChild(row);

        subTotal += item.itemTotal;
        totalDiscount += (item.itemTotal * itemDetail.discount / 100);
    });

    document.getElementById("subTotalInput").value = subTotal.toFixed(2);
    document.getElementById("discountInput").value = totalDiscount.toFixed(2);
    document.getElementById("netTotalInput").value = (subTotal - totalDiscount).toFixed(2);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    document.getElementById('orderDate').value = `${year}:${month}:${day}`;

    cartArray = [];
    localStorage.removeItem('cartArray');
}

document.getElementById('checkoutButton').addEventListener('click', (event) => {
    if (cartArray.length === 0) {
        alert("Your cart is empty. Please add items before proceeding.");
        event.preventDefault();
        return;
    }

    confirmOrder();
    alert("Order placed successfully!");
});


function confirmAll() {
    const subTotalValue = parseFloat(document.getElementById('subTotalInput').value);
    if (subTotalValue > 0) {
        alert("Order placed successfully!");
        generateOrderId();
    } else {
        alert("Please place the order.");
    }
}

function populateOrderTable() {
    // Fetch the orderArray from localStorage
    let orderArray = JSON.parse(localStorage.getItem('orderArray')) || [];
    let items = JSON.parse(localStorage.getItem('items')) || [];

    // Check if there are any orders
    if (orderArray.length === 0) {
        alert("No orders available.");
        return;
    }

    // Find all rows in the table (for simplicity, assuming only the first few rows)
    const rows = document.querySelectorAll('#orderTableBody tr');

    // Loop through the orderArray and populate the table rows
    orderArray.forEach((order, index) => {
        if (rows[index]) {
            // Get the corresponding item details
            const item = items.find(i => i.id === order.itemId);

            // Populate the inputs with order data
            rows[index].querySelector('.order-item-id').value = order.itemId;
            rows[index].querySelector('.order-item-name').value = item ? item.name : '';
            rows[index].querySelector('.order-item-price').value = item ? item.unitPrice.toFixed(2) : '';
            rows[index].querySelector('.order-item-units').value = order.quantity;
            rows[index].querySelector('.order-item-discount').value = item ? item.discount + "%" : '';
        }
    });
}
