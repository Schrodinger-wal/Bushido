const { response } = require("express");

let Users = [];

const userForm = document.getElementById('form-user');
const userBtn = document.getElementById('userBtn');
let password1 = document.querySelector('password1');
let password2 = document.querySelector('password2');
/* /////////////////////////////////////////////// */
const passForm = document.querySelectorAll('.password-form');
const userform = document.getElementById('form-user');
const submitBtn = document.querySelector('userBtn');
const tableBody = document.getElementById('table-body');

const URL = 'http:://localhost:1400/api';

userForm.addEventListener('submit', () => {
    console.dir(userForm.dataset)
})


async function cargarUsuarios() {
    try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/users`, {
        headers: {
            Authorization: token
        }
    });

    Users = response.data.user;
    renderizarTabla(Users);

    
} catch (error) {
    console.log(error)
}
}

cargarUsuarios();


let editIndex = undefined;


function renderizarTabla() {
    tableBody.innerHTML = "";

    if(users === null || users.length === 0) {
        tableBody.innerHTML = `<tr class="disabled"> <td colspan="6">No se encontraron usuarios</td> </tr>`
        /* con colspan ocupa todas las columnas que sean necesarias, en este caso 6 */
        return
    }
    users.forEach((user) => {
        const tableRow = 
        `
        <tr class="product">
                                <td class= "product__name">
                                    ${user.name}
                                </td>
                                <td class= "product__desc">
                                    ${user.email}    
                                </td>
                                <td class= "product__price">
                                ${user.date}
                                </td>
                                <td class= "product__price">
                                ${user.country}
                                </td>
                                <td class= "product__price">
                                ${user.gender}
                                </td>
                                <td class= "product__price">
                                    ${user.role}
                                </td>
                                <td class= "product__actions">
                                <button class="product__action-btn" onclick="deleteUser(${user._id})"> 
                                <i class="fa-solid fa-trash-can"></i>
                                </button>
                                    <button class="product__action-btn btn-edit" onclick="editUser(${user._id})">
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>
                                </td>
                            </tr>
        `
        tableBody.innerHTML += tableRow
    });
    }

renderizarTabla();


/* ==================================== ADD =================== */

async function addUser(evt) {
    evt.preventDefault();

    console.dir(evt.target);
    console.log(evt.target);

    const elements = evt.target.elements


    const newUser = {
        name: elements.name.value,
        email: elements.email.value,
        password: elements.password1.value,
        age: elements.age.value,
        country: elements.country.value,
        gender: elements.gender.value,
        role: elements.role.value,
    };
    const token = localStorage.getItem('token');

/*     const newFormData = new FormData(evt.target);
    const newuserFormData = Object.fromEntries(newFormData); */

    console.log(newUser);

    if(editIndex) {
        const response = await axios.put(`${URL}/users/${editIndex}`, newUser, {
            headers: {
                Authorization: token,
            }
        })
        if (!response) 
            showAlert(`No se pudo modificar el user`, 'warning' )
        else {
            showAlert(`El usuario se edito correctamente`, 'sucess')
            passForm.forEach((form) => {
                form.style.display = 'block';
            })
            password1.required = true;
            password2.required = true;
        }
    } else {
        const response = await axios.post(`${URL}/users`, newUser);
        if (!response) 
            showAlert('No se pudo agregar el usuario', 'warning')
        else 
            showAlert('Se ha agregado al usuario', 'sucess')
        
    }


    editIndex = undefined

    userBtn.classList.remove('edit-btn')
    userBtn.innerText = 'Cargar usuario'

    renderizarTabla()

    evt.target.reset();
    elements.name.focus();
}

/* ===============================DELETE====================== */

function deleteUser (id) {
    const userName = users[id].name;

    if (confirm(`¿Esta seguro que desea eliminar este user?`))
    {
    users.splice(id, 1);

    localStorage.setItem("users", JSON.stringify(users));

    showAlert(`El usuario "${userName}" borrado correctamente`, 'sucess')

    renderizarTabla()
    return
    } 
    else{
        showAlert(`Error al borrar el user`, 'error');
        return;
    }
}

/* =======================EDIT======================= */


function editUser(id) {
userBtn.classList.add('edit-btn')

userBtn.innerText = 'Editar User'

let user = users[id];

const el = userForm.elements;
el.name.value = user.name
el.email.value = user.email
el.role.value = user.role;

editIndex = id; // El edit index esta declarado despues de los documentBy
}

