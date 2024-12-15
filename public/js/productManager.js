

// Cargar tipoUsuario desde SessionStorage
const tipoUsuario = sessionStorage.getItem('tipoUsuario');

// Abrir el modal con datos del producto a editar
function editProduct(product) {
    document.getElementById('productId').value = product[0]; // Cargar id_producto
    document.getElementById('productName').value = product[1];
    document.getElementById('productDescription').value = product[2];
    document.getElementById('productPrice').value = product[4];
    document.getElementById('productStock').value = product[3];
    document.getElementById('productCategory').value = product[5];

    openProductModal();
    document.getElementById('productFormButton').innerText = 'Actualizar';
    
}

// Crear o actualizar producto al enviar el formulario
async function saveOrUpdateProduct(event) {
    event.preventDefault();

    const id_producto = document.getElementById('productId').value;
    const product = {
        nom_prod: document.getElementById('productName').value,
        desc_prod: document.getElementById('productDescription').value,
        precio: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value, 10),
        id_categoria: parseInt(document.getElementById('productCategory').value, 10)
    };

    const url = id_producto
        ? `http://localhost:3000/products/updateProduct`
        : `http://localhost:3000/products`;

    const method = id_producto ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_producto, ...product })
    });

    if (response.ok) {
        alert(id_producto ? 'Producto actualizado con éxito' : 'Producto creado con éxito');
        closeProductModal();
        getAllProductsForClient(); // Refrescar la lista
    } else {
        alert('Error al guardar el producto');
    }
}

document.getElementById('productForm').addEventListener('submit', saveOrUpdateProduct);

// Abrir el modal
function openProductModal() {
    document.getElementById('productModal').style.display = 'block';
}

// Cerrar el modal
function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Crear un nuevo producto
/*async function createProduct(event) {
    event.preventDefault();

    const product = {
        nom_prod: document.getElementById('productName').value,
        desc_prod: document.getElementById('productDescription').value,
        precio: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value, 10),
        id_categoria: parseInt(document.getElementById('productCategory').value, 10)
    };

    const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        alert('Producto creado con éxito');
        closeProductModal();
        getAllProductsForClient(); // Refrescar la lista de productos
    } else {
        alert('Error al crear el producto');
    }
}*/

// Asociar el evento al formulario
//document.getElementById('productForm').addEventListener('submit', createProduct);

// Función para eliminar un producto
async function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        const response = await fetch('http://localhost:3000/products/deleteProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_producto: productId })
        });

        if (response.ok) {
            alert(await response.text());
            getAllProductsForClient(); // Refrescar la lista de productos
        } else {
            alert('Error al eliminar el producto');
        }
    }
}

// Función para obtener y renderizar productos
async function getAllProductsForClient() {
    const response = await fetch('http://localhost:3000/products/getProducts');
    const products = await response.json();

    const cardContainer = document.getElementById('productCardContainer');
    cardContainer.innerHTML = ''; // Limpiar las tarjetas de productos

    products.forEach(product => {
        const actionButtons = `
            <button class="btn btn-primary btn-sm btn-custom" onclick='addToCart(${JSON.stringify(product)})'>Agregar al carrito</button>
            ${tipoUsuario === '3' ? `
                <button class="btn btn-danger btn-sm btn-custom" onclick='deleteProduct(${product[0]})'>Eliminar</button>
                <button class="btn btn-warning btn-sm btn-custom" onclick='editProduct(${JSON.stringify(product)})'>Editar</button>
            ` : ''}
        `;
    
        const card = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 card-custom">
                <div class="card">
                    <img src="/images/${product[6]}" alt="${product[1]}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${product[1]}</h5>
                        <p class="card-text">${product[5]}</p>
                        <p class="card-text"><strong>Precio: $${product[4]}</strong></p>
                        <div class="card-actions">
                            ${actionButtons}
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        cardContainer.innerHTML += card;
    });
}    


// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    getAllProductsForClient();
    loadCart();
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    if (tipoUsuario === '3') {
        document.getElementById('adminButtonContainer').style.display = 'block';
    }
});
