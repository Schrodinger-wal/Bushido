let order = JSON.parse(localStorage.getItem('order')) || [];
let badge = document.getElementById('cart-count');


let input = document.getElementById("order__input-cantidad${id}");

function contador() {
    let cantidad = 0;
    order.forEach((order) => {
        cantidad += order.cantidad; 
    });
    badge.innerHTML = cantidad;
    console.log('la cantidad total es de:', cantidad` productos`)
}

contador();

const tbody = document.getElementById('tbody');

function renderizarTabla() {
    let totalOrden = 0;
    tbody.innerHTML = ``

    if (order.length === 0) {
        table.tbody = `<tr class="disabled"> <td colspan="6">No se encontraron usuarios</td> </tr>`
        return;
    }

    //se podria poner algo para que la imagen quede como notFound

    const tableRow = 
    `
        <tr>
        <td>
        <img class= "product__img" src="${imageSrc}" width="120px" alt="${producto.name}">      
        </td>
        <td class= "product__name">
        ${producto.name}
        <td class= "product__price">
        $ ${producto.price}
    </td>
        <td class="product__price">
        <div class="order-cant-btn">
            <button class="product__action-btn" onclick="AumentarProducto(${index})">-</button>
            <input class="order-cant-btn__input" id="order__input-cantidad${index}" type="number" value="${product.cant}" onchange="cantidadProducto(${index})">
            <button class="product__action-btn" onclick="DisminuirProducto(${index})">+</button>
        </div>
        </td>
        <td class="product__price">
        $ ${product.total}
        </td>
        <td>
        <button class="order__delete-btn" onclick="deleteProduct(${index})">
            <i class="fa-solid fa-x"></i>
        </button>
        </td>
    </tr>
        `

tbody.innerHTML += tableRow;
totalOrden += order.detail;
}

const tableRow = 
`
<tr>
<td class="order__valor" colspan='4'>
    TOTAL
</td>
<td class="order__valor">
    $ ${totalOrden}
</td>
</tr>
`



    function AumentarProducto() {
        input.value = valorActual + 1;
        valorActual = parseInt(input.value);
    }

    function DisminuirProducto() {
        if (valorActual > 1) {
            input.value = Math.max(parseInt(input.value, 10) - 1, 1);
            cantTotal(id);
        }
    }

    function cantTotal(id) {
        const cantidadProducto = document.getElementById(`order__input-cantidad`)
        order[id].cantidad = parseInt(cantidadProducto.value, 8);
        order[id].total = order[id].cantidad * parseInt(order[id].price, 8);
        localStorage.setItem('order', JSON.stringify(order));
        renderizarTabla();
        contador();
    }

    function RealizarCompra() {
const currentUser = JSON.parse (localStorage.getItem('currentUser'));

if (!currentUser) {
    showAlert('Requiere inicio de sesion!!', 'sucess')
} else {
    if (order.length === 0) {
        showAlert ('Debe tener productos en su carrito para poder concretar', 'sucess')
} else {
    localStorage.removeItem('order')
    order = [];
    renderizarTabla(),
    showAlert('Se ha concretado la compra con exito', 'sucess')
    contador();
}
    }
    }


















/* const Badge = document.getElementById("cart-count")


let order = {
    products: [
        {
            productname: "Nyngho", // si el nombre del producto es igual
            cantidad: 2,
            price: 3500,
        },
    ],
    user: 'ejemplo@ejemplo.com',
    total: 30000,
};


//carrito

function actualizarBadge() {
    Badge.innerHTML = order.products.reduce((acumulador, producto) => {
        acumulador += acumulador + producto.cantidad;
        return acumulador
    }), 0
}

actualizarBadge(); */


//Agregar elemento
//tener la posibilidad de que cuando apriete el boton de comprar se añada el elemento al array dentro de order.products
    //antes de hacer un psuh 
//deberia checkear buscando con un findindex deberia chekkear si el producto ya se encuntra
    //si se encuenta incremento de ese producto su cantidad
    //si no hago un push de ese elemento
//incrementar el total

// eleminar elemento
//pintamos en el boton de mi orden el index de el array order.productrs y lo eliminamos.
    //splice
//guardar el precio del producto por la cantidad y restarselo al total
//actualizar el sessionStorage con el nuevo valor

//Listar orden
//pintar los elementos en una nueva pagina, 
