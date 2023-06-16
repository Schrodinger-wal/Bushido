let Products = [];
const token = localStorage.getItem('token')

const URL = 'http://localhost:1400/api';
let selectCategoryHTML = document.getElementById('category');


const productForm = document.getElementById('form-product');
const submitbtn = document.getElementById('btnProduct');
const tableBody = document.getElementById('tableBody')


/* ===============================TABLA================================== */

async function cargarCategorias(){
    try {
        
        const response = await axios.get(`${URL}/category`)
        const categories = response.data.categories
        selectCategoryHTML.innerHTML = '<option value="" selected></option>';
        categories.forEach((cat)=> {
            selectCategoryHTML.innerHTML += `<option value="${cat._id}">${cat.name}</option>` 
            console.log(response.data.categories);
        })
    } catch (error) {
        console.log(error)
    }
}

cargarCategorias()


async function cargarProductos() {
    try {
        const respuesta = await axios.get(`${URL}/products`)
        
        console.log(respuesta.data.Products)

        Products = respuesta.data.productos
        renderizarTabla(Products)
    } catch (Error) {
        console.warn(error)
    }
}

cargarProductos();

let editIndex;

function renderizarTabla (Products) {
    tableBody.innerHTML = "";

    if(Products.length === 0) {
        tableBody.innerHTML = `<tr> <td colspan= "6">No se 
        encontraron productos</td> </tr>`
        return;
    }
    Products.forEach((producto) => {
        
        let imageSrc = producto.image ? `${URL}//products/upload/image/${producto.image}` : '/assets/pages-notifier/not-found.png';
        const tableRow = 
    `<tr class="product">
        <td class="product__img-cell">
            <img class= "product__img" 
            src="${imageSrc}">                    
        </td>
        <td class= "product__name">
            ${producto.name}
        </td>
        <td class= "product__desc">
            ${producto.description}    
        </td>
        <td class= "product__price">
            $ ${producto.price}
        </td>
        <td class= "product__actions">
            <button class="product__action-btn" onclick="deleteProduct(${producto._id})"> 
                <i class="fa-solid fa-trash-can"></i>
            </button>
            <button class="product__action-btn btn-edit" onclick="editProduct(${producto._id})">
                <i class="fa-solid fa-pencil"></i>
            </button>
        </td>
    </tr>`
    tableBody.innerHTML += tableRow
    });
}

renderizarTabla();
cargarProductos();

function addProduct(evt) {
    try {
        
    
    evt.preventDefault();
    console.dir(evt.target);
    console.log(evt.target);

    const elements = evt.target.elements
    const formFile = new FormData(evt.target)

    /* 
    |
    |
    |
    V
     */



const updateProduct = {
    name: elements.name.value,
    description: elements.description.value,
    price: elements.price.valueAsNumber,
    image: elements.image.value,
};
console.log(updateProduct)
if(editIndex) {}
    const newFormData = new FormData(evt.target);
    const newProductFormData = Object.fromEntries(newFormData);

    newProductFormData.price = +newProductFormData.price;

    console.log(newProduct)

    if(editIndex >= 0) {
        Products[editIndex] = newProduct;
        showAlert(`El producto a sido editado satisfactoriamente` ,'sucess')
        
    } else {
        Products.push(newProduct)
        showAlert(`El producto ha sido agregado con exito`)
/*         showAlert(`El producto se agrego!!`, 'sucess'); */
    }

    localStorage.setItem("Products", JSON.stringify(Products))

    editIndex = undefined

    submitbtn.classList.remove('edit-btn');
    submitbtn.innerText = 'Cargar producto'
    console.log(Products)

    renderizarTabla()

    evt.target.reset()
    elements.name.focus()
} catch (error) {
        
}
}





/* ===========================DELETE=============================== */


function deleteProduct(id) {
    const productName = Products[id].name;

    if (confirm(`¿Esta seguro que desea eliminar este producto?`))
    {
    Products.splice(id, 1);

    localStorage.setItem("Products", JSON.stringify(Products));

    showAlert(`El producto "${productName}" ha sido borrado correctamente`)

    renderizarTabla()
    return
    } else{
        showAlert(`Error al borrar el user`, 'Error');
        return;
    }
}

/* ================================EDIT=========================== */

function editProduct(id) {
    submitbtn.classList.add("edit-btn");
    submitbtn.innerText = "Modificar producto";

    let product = Products[id];
    const el = productForm.elements;
    el.name.value = product.name;
    el.description.value = product.description;
    el.price.value = product.price;
    el.image.value = product.image;

    editIndex = id;
}
