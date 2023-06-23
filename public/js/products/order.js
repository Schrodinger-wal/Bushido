let products = JSON.parse(localStorage.getItem('order')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

let badge = document.getElementById('cart-count');
let input = document.getElementById(`order__input-cantidad${id}`);

async function cargarOrdenes() {
    try {
        const respuesta = await axios.get(`${URL}/order/${currentUser._id}/user`);
        const orders = respuesta.data.ordenes;
        renderizarTabla(orders);
    } catch (error) {
        console.log(error);
    }
}

const tbody = document.getElementById('tbody');
let editIndex;

function renderizarTabla() {
    let totalOrden = 0;
    tbody.innerHTML = '';

    if (products.length === 0) {
        tbody.innerHTML = `<tr class="disabled"> <td colspan="6">No se encontraron usuarios</td> </tr>`;
        return;
    }

    products.forEach((producto, index) => {
        let imageSrc = producto.image ? producto.image : '/assets/page-notifier/not-found.png';
        const tableRow = `
        <tr>
            <td>
                <img class="product__img" src="${imageSrc}" width="120px" alt="${producto.name}">
            </td>
            <td class="product__name">
                ${producto.name}
            </td>
            <td class="product__price">
                $ ${producto.price}
            </td>
            <td class="product__price">
                <div class="order-cant-btn">
                    <button class="product__action-btn" onclick="AumentarProducto(${index})">-</button>
                    <input class="order-cant-btn__input" id="order__input-cantidad${index}" type="number" value="${producto.cant}" onchange="cantidadProducto(${index})">
                    <button class="product__action-btn" onclick="DisminuirProducto(${index})">+</button>
                </div>
            </td>
            <td class="product__price">
                $ ${producto.total}
            </td>
            <td>
                <button class="order__delete-btn" onclick="deleteProduct(${index})">
                    <i class="fa-solid fa-x"></i>
                </button>
            </td>
        </tr>`;
        tbody.innerHTML += tableRow;
        totalOrden += producto.total;
    });

    const tableRow = `
    <tr>
        <td class="order__valor" colspan="4">
            TOTAL
        </td>
        <td class="order__valor">
            $ ${totalOrden}
        </td>
    </tr>`;
    tbody.innerHTML += tableRow;
}

function AumentarProducto(id) {
    console.log('AumentarProducto:', id);
    var input = document.getElementById(`order__input-cantidad${id}`);
    var value = parseInt(input.value, 10);
    input.value = isNaN(value) ? 1 : value + 1;
    updateTotal(id);
}

function DisminuirProducto(id) {
    console.log('DisminuirProducto:', id);
    var input = document.getElementById(`order__input-cantidad${id}`);
    var value = parseInt(input.value, 10);
    input.value = isNaN(value) ? 1 : value - 1;
    if (input.value < 1) {
        input.value = 1;
    }
    updateTotal(id);
}

function cantidadProducto(id) {
    console.log('cantidadProducto:', id);
    const cantidadProducto = document.getElementById(`order__input-cantidad${id}`);
    order[id].cantidad = parseInt(cantidadProducto.value, 8);
    order[id].total = order[id].cantidad * parseInt(order[id].price, 8);
    localStorage.setItem('order', JSON.stringify(order));
    renderizarTabla();
    contador();
}

function RealizarCompra() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        console.log('Requiere inicio de sesión!!');
        Swal.fire(
            'Oh oh, problemas!',
            'Requiere inicio de sesión!!',
            'error'
        );
    } else {
        if (order.length === 0) {
            console.log('Debe tener productos en su carrito para poder concretar');
            Swal.fire(
                'Problemas!!',
                'Debe tener productos en su carrito para poder concretar.',
                'warning'
            );
        } else {
            localStorage.removeItem('order');
            order = [];
            renderizarTabla();
            Swal.fire(
            'Enhorabuena!',
            'Producto agregado al carrito.',
            'success'
        );

            contador();
        }
    }
}