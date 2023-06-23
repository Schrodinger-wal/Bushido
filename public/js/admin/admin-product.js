let products = [];
const token = localStorage.getItem('token')

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
        
        console.log(respuesta.data.products)

        products = respuesta.data.productos
        renderizarTabla(products)
    } catch (Error) {
        console.warn(error)
    }
}

cargarProductos();

let editIndex;

function renderizarTabla(products) {
    tableBody.innerHTML = "";

    if(products.length === 0) {
        tableBody.innerHTML = `<tr> <td colspan= "6">No se 
        encontraron productos</td> </tr>`
        return;
    }
    products.forEach((producto) => {
        
        let imageSrc = producto.image ? `${URL}/products/upload/image/${producto.image}` : '/assets/page-notifier/not-found.png';
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



    async function addProduct(evt) {
        evt.preventDefault();
    
        const elements = evt.target.elements;
        const formFile = new FormData(evt.target);
    
        const newProduct = {
        name: elements.name.value,
        description: elements.description.value,
        price: elements.price.value,
        category: elements.category.value,
        };
    
        const token = localStorage.getItem('token');
    
        try {
        if (editIndex) {
            const response = await axios.put(`${URL}/products/${editIndex}`, newProduct, {
            headers: {
                Authorization: token,
            },
            });
    
            if (response.data.success) {
            showAlert('El producto se editó correctamente', 'success');
            } else {
            showAlert('No se pudo modificar el producto', 'warning');
            }
        } else {
            const response = await axios.post(`${URL}/products`, newProduct, {
            headers: {
                Authorization: token,
            },
            });
    
            if (response.data.success) {
            showAlert('El producto se ha agregado exitosamente', 'success');
            } else {
            showAlert('No se pudo agregar el producto', 'warning');
            }
        }
    
        editIndex = undefined;
        productBtn.classList.remove('edit-btn');
        productBtn.innerText = 'Cargar producto';
        evt.target.reset();
        elements.name.focus();
    
        cargarProductos();
        limpiar();
        } catch (error) {
        showAlert('Ha ocurrido un error', 'error');
        console.log(error);
        console.log(error.response);
        }
    }
    
    /* ===============================Reiniciar====================== */
    
    
    function limpiar(){
        const el = productForm.elements;
        
        el.name.value = '';
        el.description.value = '';
        el.price.value = '';
        el.category.value = '';
    }


/* ===========================DELETE=============================== */

async function deleteProduct(id) {
    const confirmation = await confirm(`¿Está seguro que desea eliminar este producto?`);

    if (confirmation === true) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${URL}/products/${id}`, /* {
                headers: { Authorization: token }
            } */);
            Swal.fire(
                'El producto ha sido borrado correctamente.',
                'moviendonos a la pagina principal!!',
                'success'
            );
            cargarUsuarios();
        } catch (error) {
            Swal.fire(
                'Error al borrar el producto.',
                'moviendonos a la pagina principal!!',
                'error'
            );
            console.log(error);
        }
        renderizarTabla();
    }
}
/* ================================EDIT=========================== */

function editProduct(id) {
    submitbtn.classList.add("edit-btn");
    submitbtn.innerText = "Modificar producto";

    let product = products[id];
    const el = productForm.elements;
    el.name.value = product.name;
    el.description.value = product.description;
    el.price.value = product.price;
    el.image.value = product.image;

    editIndex = id;
}
