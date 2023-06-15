let Products = JSON.parse(localStorage.getItem("Products")) || [];

const productForm = document.getElementById('form-product');
const submitbtn = document.getElementById('btnProduct');
const tableBody = document.getElementById('tableBody')

productForm.addEventListener ('click', () => {
    console.dir(productForm.dataset)
})


/* ===============================TABLA================================== */

let editIndex;

function renderizarTabla () {
    tableBody.innerHTML = "";

    if(Products.length === 0) {
        tableBody.innerHTML = `<tr> <td colspan= "6">No se 
        encontraron productos</td> </tr>`

        return
    }
    Products.forEach((producto, index) => {
        
        let imageSrc = producto.image ? producto.image : '/assets/page-notifier/not-found.png'
        // la imagen va a ser encontrada por este let

        const tableRow = 
    `<tr class="product">
        <td class="product__img-cell">
            <img class= "product__img" src="${imageSrc}" width="120px" alt="${producto.name}">                    
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
            <button class="product__action-btn" onclick="deleteProduct(${index})"> 
                <i class="fa-solid fa-trash-can"></i>
            </button>
            <button class="product__action-btn btn-edit" onclick="editProduct(${index})">
                <i class="fa-solid fa-pencil"></i>
            </button>
        </td>
    </tr>`
    tableBody.innerHTML += tableRow
    });
}

renderizarTabla();


function addProduct(evt) {
    evt.preventDefault();
    console.dir(evt.target);
    console.log(evt.target);

    const elements = evt.target.elements

    /* 
    |
    |
    |
    V
     */



const newProduct = {
    name: elements.name.value,
    description: elements.description.value,
    price: elements.price.valueAsNumber,
    image: elements.image.value,
    
};
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
