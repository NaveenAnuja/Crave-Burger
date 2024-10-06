function addCustomer() {
    const customerId = document.getElementById('customerId').value;
    const customerName = document.getElementById('customerName').value;
    const customeraddress = document.getElementById('customerAddress').value;
    const customerTel = document.getElementById('customerTel').value;
    const customerEmail = document.getElementById('customerEmail').value;

    if (!customerId || !customerName || !customerTel || !customerEmail) {
        alert("Please fill in all fields");
        return;
    }

    console.log(customerId);
    console.log(customerName);
    console.log(customeraddress);
    console.log(customerTel);
    console.log(customerEmail);

    const customer = {
        id: customerId,
        name: customerName,
        address: customeraddress,
        telephone: customerTel,
        email: customerEmail,
    };

    let customers = JSON.parse(localStorage.getItem('customers')) || [];

    customers.push(customer);

    localStorage.setItem('customers', JSON.stringify(customers));

    ;
    console.log("Added Customer:", customer);
    console.log("All Customers in localStorage:", customers);
    generateCustomerId();
    clearInputFields();
    
    alert('Customer added successfully!');
}





document.addEventListener('DOMContentLoaded', function () {
    function loadCustomers() {
        let customers = JSON.parse(localStorage.getItem('customers')) || [];

        const tableBody = document.querySelector('tbody');

        tableBody.innerHTML = '';

        customers.forEach(customer => {
            const row = document.createElement('tr');

            const customerIdCell = document.createElement('th');
            customerIdCell.scope = "row";
            customerIdCell.textContent = customer.id;

            const customerNameCell = document.createElement('td');
            customerNameCell.textContent = customer.name;

            const customerAddress = document.createElement('td');
            customerAddress.textContent = customer.address;

            const customerTelCell = document.createElement('td');
            customerTelCell.textContent = customer.telephone;

            const customerEmailCell = document.createElement('td');
            customerEmailCell.textContent = customer.email;


            row.appendChild(customerIdCell);
            row.appendChild(customerNameCell);
            row.appendChild(customerAddress);
            row.appendChild(customerTelCell);
            row.appendChild(customerEmailCell);

            tableBody.appendChild(row);
        });
    }

    loadCustomers();
});




function searchCustomer() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const customers = JSON.parse(localStorage.getItem('customers')) || [];

    const foundCustomer = customers.find(customer => customer.id.toLowerCase() === searchInput);

    if (foundCustomer) {

        document.getElementById('customerId').value = foundCustomer.id;
        document.getElementById('customerName').value = foundCustomer.name;
        document.getElementById('customerAddress').value = foundCustomer.address;
        document.getElementById('customerTel').value = foundCustomer.telephone;
        document.getElementById('customerEmail').value = foundCustomer.email;

        alert('Customer found. You can now update the details.');
    } else {
        alert('Customer not found. Please check the ID and try again.');
        clearInputFields();
    }
}





function UpdateCustomer() {
    const customerId = document.getElementById('customerId').value;
    const customerName = document.getElementById('customerName').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const customerTel = document.getElementById('customerTel').value;
    const customerEmail = document.getElementById('customerEmail').value;

    if (!customerId || !customerName || !customerAddress || !customerTel || !customerEmail) {
        alert("Please fill in all fields");
        return;
    }

    let customers = JSON.parse(localStorage.getItem('customers')) || [];

    const existingItemIndex = customers.findIndex(customer => customer.id === customerId);

    if (existingItemIndex !== -1) {
        customers[existingItemIndex] = {
            id: customerId,
            name: customerName,
            address: customerAddress,
            telephone: customerTel,
            email: customerEmail,
        };
        localStorage.setItem('customers', JSON.stringify(customers));
        alert('Item updated successfully!');
        clearInputFields();
    } else {
        alert('Item not found. Please search first or add a new item.');
    }
}



function deleteCustomer() {
    const customerId = document.getElementById('customerId').value;
    if (!customerId) {
        alert("Please search for an Customer ID to delete.");
        return;
    }


    let customers = JSON.parse(localStorage.getItem('customers')) || [];


    const customerIndex = customers.findIndex(customer => customer.id === customerId);

    if (customerIndex !== -1) {

        customers.splice(customerIndex, 1);

        localStorage.setItem('customers', JSON.stringify(customers));

        alert('Customer deleted successfully!');
        clearInputFields();
    } else {
        alert('Customer not found. Please check the ID and try again.');
    }
}



function clearInputFields() {
    document.getElementById('customerId').value = '';
    document.getElementById('customerName').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('customerTel').value = '';
    document.getElementById('customerEmail').value = '';
}

let customerCount = 0;

generateCustomerId();

function generateCustomerId() {
    const id = "C" + (customerCount + 1).toString().padStart(4, '0');
    console.log(id);
    document.getElementById("customerId").value = id;
}