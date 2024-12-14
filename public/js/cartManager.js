let cart = [];

// Cargar carrito desde SessionStorage al iniciar
function loadCart() {
    const savedCart = sessionStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
    renderCart();
}

// Guardar el carrito en SessionStorage
function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Agregar un producto al carrito
function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
}

// Mostrar el carrito en la tabla correspondiente
function renderCart() {
    const cartTableBody = document.getElementById('cartTableBody');
    const totalElement = document.getElementById('cartTotal');
    cartTableBody.innerHTML = ''; // Limpiar la tabla del carrito

    let total = 0;
    cart.forEach((product, index) => {
        total += product[4];
        const row = `
            <tr>
                <td>${product[1]}</td>
                <td>${product[5]}</td>
                <td>${product[4]}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Eliminar</button></td>
            </tr>
        `;
        cartTableBody.innerHTML += row;
    });

    totalElement.innerText = total.toFixed(2); // Mostrar el total
}

// Eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar el producto por índice
    saveCart();
    renderCart();
}

// Función para realizar la compra
function checkout() {
    alert('Gracias por comprar en EGESVEN');
    cart = [];
    saveCart();
    renderCart();
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    getAllProductsForClient();
    loadCart();
});