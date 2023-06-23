

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('currentUser'));
const cardContainer = document.getElementById('card-container')
const productsNew = JSON.parse(localStorage.getItem('Products')) || [];
let Products = []

async function cargarProductos(){
    try {
        const respuesta = await axios.get(`${URL}/products`)
        products = respuesta.data.productos
        renderizarProductos(products)
        console.log(respuesta)
        
    } catch (error) {
        console.log(error)
    }
}
cargarProductos();


function renderizarProductos(products) {
    cardContainer.innerHTML = ``;

    products.forEach((product) => {

        const card = document.createElement('article');
        card.classList.add('card');

        let imageSrc = product.image /* ? product.image : '/assets/page-notifier/not-found.png' */

        card.innerHTML = `
                <div class="card__header">
                    <img src="${imageSrc}" alt="${product.name}" class="card__img">
                </div>
                <div class="card__body">
                    <div class="card__title">
                        ${product.name}
                    </div>
                    <p class="card__description">
                        ${product.description}"
                    </p>
                    <div class="card__price">
                        ${product.price}
                    </div>
                </div>
                <div class="card__footer">

                    <div class="card__btn-container">
                    <a class="card__btn" onclick="addToOrder(${product._id})" >
                            Agregar al carrito
                        </a> 
                    </div>
                    <div class="card__btn-container">
                        <a href="/product-detail?id=${product._id}" class="card__btn">
                            Detalle 
                        </a> 
                    </div>
                </div>`

        cardContainer.appendChild(card);
    });
}


async function addToOrder(id) {
    try {
        const respuesta = await axios.get(`${URL}/products/${id}`);
        const product = respuesta.data.product;
        
        if (!product) {
            // Aquí puedes mostrar una alerta o realizar alguna acción si el producto no se encuentra
            return;
        }

        // Agregar el producto al carrito
        const order = JSON.parse(localStorage.getItem('order')) || [];
        order.push(product);
        localStorage.setItem('order', JSON.stringify(order));

        // Mostrar una alerta o realizar otra acción para confirmar que el producto se agregó al carrito
        Swal.fire(
            'Enhorabuena!',
            'Producto agregado al carrito.',
            'success'
        );

    } catch (error) {
        console.log(error);
    }
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

