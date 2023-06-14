const user = JSON.parse(localStorage.getItem('currentUser'));
const params = window.location.search

console.log(params)

const paramsURL = new URLSearchParams(params)
const paramsEntries = Object.fromEntries(paramsURL)

const indice = paramsEntries.id;

const products = JSON.parse(localStorage.getItem('Products'));
const product = products[indice];

function renderizarProductos() {
    const detail = document.getElementById('product-detail');
    const product = products[indice];

detail.innerHTML = 

`
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
`

}

renderizarProductos();

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
    const cant = document.getElementById('input-cant')
    const newOrder = {
        image: product.image,
        name: product.name,
        price: product.price,
        cant: parseInt(cantProd.value),
        total: parseInt(cantProd.value) * parseInt(product.price)
        // buscamos la cantidad, luego esa cantidad es multiplicada por el valor del producto
    }
    
    const prod = order.fid((prod) => {
        if(prod.name === product.name){
            prod.cant = parseInt(prod.cant) + parseInt(cantProd.value);
            prod.total = prod.cant * parseInt(prod.price);
            return prod;
        }
    })

    if(!prod) {
        order.push(newOrder)
    }
}

localStorage.setItem('order', JSON.stringify(order));

contador();

function addToOrder(){

    const existe = Order.find((prod)=>{
        if(product.name === product.name){
            return prod;
        }
    })
    if(!existe)
        addToOrder();
    window.location.href = "/pages/order/order.html"
}




// despues se hace todo con el back


// hacer el cargado de imagen

renderizarProductos();