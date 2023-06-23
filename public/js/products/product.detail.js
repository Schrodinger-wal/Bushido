const user = JSON.parse(localStorage.getItem("currentUser"));
const params = window.location.search;
const products = [];

console.log(params);

const paramsURL = new URLSearchParams(params);
const paramsEntries = Object.fromEntries(paramsURL);

const indice = params.split("id=")[1];


async function obtenerProducto() {
    try {
        const respuesta = await axios.get(`${URL}/products`)
        const products = respuesta.data.products;
        return products;
    } catch (error) {
        console.log(error);
    }
}

async function renderizarProductos(id) {
    try {
        const respuesta = await axios.get(`${URL}/products/${id}`);
        product = respuesta.data.product;
        const detail = document.getElementById("product-detail");

        detail.innerHTML = `
<section class="product-detail">
    <div class="product-detail__image-container">
        <img src="${product.image}" alt="Product Image${product.name}" class="product-detail__image">
    </div>
    
    <div class="product-detail__info">
        <h2 class="product-detail__title">${product.name}</h2>
        <p class="product-detail__description">${product.description}</p>
    <div class="product-detail__price">${product.price}}</div>
    

    <div class="product-detail__footer">
    <div class="product-detail__cant-container">
        <h4 class="product-detail__cant">Cantidad</h4>
    <div class="product-detail__cant-buttons">
        <button id="button-plus" onclick="AumentarProducto">+</button>
            <input type="text" value="1" id="input-cant" class="product-detail__input-Cant" onchange="calculateTotalCant()" maxlength="2">
        <button onclick="DisminuirProducto" id="button-minus">-</button>
    </div>
    </div>
</div>
    </div>

    <button class="product-detail__add-to-cart" >Agregar al carrito</button>

</div>
</section>
`;
    } catch (error) {
        console.warm(error);
    }
}

renderizarProductos(index);

let input = document.getElementById("input-cant");
let valorActual = parseInt(input.value);

function AumentarProducto() {
    input.value = valorActual + 1;
    valorActual = parseInt(input.value);
}

function DisminuirProducto() {
    if (valorActual > 1) {
        input.value = valorActual - 1;
        valorActual = parseInt(input.value);
    } // todo checkear los id
}

function addCart() {
    const cant = document.getElementById("input-cant");
    const newOrder = {
        id: product._id,
        image: product.image ?
            `${URL}/upload/product/${product.image}` :
            "/assets/page-notifier/not-found.png",
        name: product.name,
        price: product.price,
        cant: parseInt(cant.value),
        total: parseInt(cant.value) * parseInt(product.price),
        // buscamos la cantidad, luego esa cantidad es multiplicada por el valor del producto
    };

    const prod = Order.find((prod) => {
        if (prod.name === product.name) {
            prod.cant = parseInt(prod.cant) + parseInt(cantProd.value);
            prod.total = prod.cant * parseInt(prod.price);
            return product;
        }
    });

    if (!prod) {
        order.push(newOrder);
    }
    localStorage.setItem("order", JSON.stringify(order));

    contador();
    Swal.fire("Bien!", "Has agregado corretamente el producto ;D", "success");
}

function addToOrder() {
    const existe = Order.find((prod) => {
        if (product.name === product.name) {
            return prod;
        }
    });
    if (!existe) addToOrder();
    window.location.href = "/pages/order/order.html";
}

// despues se hace todo con el back

// hacer el cargado de imagen

renderizarProductos();