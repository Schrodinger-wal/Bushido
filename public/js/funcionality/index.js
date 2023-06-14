const user = JSON.parse(localStorage.getItem('currentUser'));
const cardContainer = document.getElementById('card-container')
const productsNew = JSON.parse(localStorage.getItem('Products')) || [];


function renderizarProductos(products) {
    cardContainer.innerHTML = ``;

    products.forEach((product, index) => {

        const card = document.createElement('article');
        card.classList.add('card');

        card.innerHTML = `
                <div class="card__header">
                    <img src="${product.image}" alt="${product.name}" class="card__image">
                </div>
                <div class="card__body">
                    <div class="card__title">
                        ${product.name}
                    </div>
                    <p class="card__description">
                        ${product.description}"
                    </p>
                    <div class="card__price">
$${product.price}
                    </div>
                </div>
                <div class="card__footer">

                    <div class="card__btn-container">
                        <a class="card__btn" onclick="addtoOrder(${index})" ${user ? "" : "disabled"}> 
                            Agregar al carrito
                        </a> 
                    </div>
                    <div class="card__btn-container">
                        <a href="/pages/product-detail/product-detail.html?id=${index}" class="card__btn">
                            Detalle 
                        </a> 
                    </div>
                </div>`

        cardContainer.appendChild(card);
    });
}


function addtoOrder(id) {
    const product = productsNew[id];

    const productName = Products[id].name

    const newOrder = {
        image: product.image,
        name: product.name,
        description: product.description,
        cantidad: 1,
        total: product.price
    }

    const prod = order.find((product) => {
        if(prod.name === product.name) {
            prod.cantidad = parseInt(prod.cantidad) + 1;
            prod.total = prod.cantidad * parseInt(prod.price);
            return prod;
        }
    })

    if(!prod) {
        order.push(newOrder)
    }


localStorage.setItem('order', JSON.stringify(order));
showAlert(`El producto "${productName}" ha sido agregado`)

countCant();
}



function countCant() {
    order = JSON.parse(localStorage.getItem('order')) || [];
    let cantidad = 0
    order.forEach((prod) =>{
        cantidad += prod.cant;
    })
    badge
}

const filterInput = document.getElementById('filter');


function filtrarProductos(evt) {
    const text = evt.target.value.toLowerCase();

    //Se resume que filtre el producto por el texto ingresado, este mismo como los nombres de los productos son pasados a minusculas.
    const filterProducts = productsNew.filter(product => product.name.toLowerCase().includes(text)
    )

    renderizarProductos(filterProducts);

    const find = document.getElementById('products-count');
    find.innerHTML = `En tu busqueda se encontraron ${filterProducts.length} productos`
};




renderizarProductos(productsNew);

