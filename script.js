const products = [
    { id: 1, name: "Product 1", price: 33, quantity: 3 },
    { id: 2, name: "Product 2", price: 70, quantity: 5 },
    { id: 3, name: "Product 3", price: 64, quantity: 0 },
    { id: 4, name: "Product 4", price: 426, quantity: 2 }
];

let cart = [];

function renderProducts() {
    products.forEach(product => {
        const productElement = document.querySelector(`[data-id="${product.id}"]`);
        if (productElement) {
            const stockBadge = productElement.querySelector('.badge');
            stockBadge.textContent = product.quantity.toString();
        }
    });
}

function renderCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            ${item.name} - $${item.price}
            <button class="btn btn-danger btn-primary remove-from-cart" data-id="${item.id}">Remove</button>
        `;
        cartList.appendChild(li);
    });

    updateSubtotal();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product && product.quantity > 0) {
        product.quantity -= 1;
        cart.push({ ...product });

        renderProducts();
        renderCart();
    } else {
        alert("Product is out of stock");
    }
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
        const removedProduct = cart.splice(index, 1)[0];

        const originalProduct = products.find(p => p.id === removedProduct.id);
        if (originalProduct) {
            originalProduct.quantity += 1;
        }

        renderProducts();
        renderCart();
    }
}

function updateSubtotal() {
    const subtotalElement = document.getElementById("subtotal");
    const subtotal = cart.reduce((total, product) => total + product.price, 0);
    subtotalElement.textContent = subtotal.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return "Your cart is empty.";
    }

    const total = cart.reduce((total, product) => total + product.price, 0);
    const numberOfProducts = cart.length;
    const productsList = cart.map(product => product.name).join(', ');

    const alertMessage = `
        Total Price: $${total.toFixed(2)}
        Number of Products: ${numberOfProducts}
        Products: ${productsList}
    `;
    alert(alertMessage);
    return { total, numberOfProducts, productsList };
}

document.getElementById("checkout-btn").addEventListener("click", checkout);

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", event => {
        const productId = parseInt(event.target.getAttribute("data-id"));
        addToCart(productId);
    });
});

document.querySelectorAll(".remove-from-cart").forEach(button => {
    button.addEventListener("click", event => {
        const productId = parseInt(event.target.getAttribute("data-id"));
        removeFromCart(productId);
    });
});

// Initial rendering
renderProducts();
renderCart();


document.querySelectorAll(".qty").forEach(item => {
    const minusBtn = item.querySelector(".minus");
    const plusBtn = item.querySelector(".plus");
    const countInput = item.querySelector(".count");

    minusBtn.addEventListener("click", () => {
        let currentValue = parseInt(countInput.value);
        if (currentValue > 0) {
            countInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener("click", () => {
        let currentValue = parseInt(countInput.value);
        countInput.value = currentValue + 1;
    });

    renderProducts();
    renderCart();

});