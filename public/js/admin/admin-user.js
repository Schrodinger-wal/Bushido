let users = JSON.parse(localStorage.getItem("users")) || [];

userForm = document.getElementById('form-user')
userForm.addEventListener('submit', () => {
    console.dir(userForm.dataset)
})

const userBtn = document.getElementById('userBtn')
const tableBody = document.getElementById('table-body')

let editIndex;





function renderizarTabla() {
    tableBody.innerHTML = "";

    if(users === null || users.length === 0) {
        tableBody.innerHTML = `<tr class="disabled"> <td colspan="6">No se encontraron usuarios</td> </tr>`
        /* con colspan ocupa todas las columnas que sean necesarias, en este caso 6 */
        return
    }
    users.forEach((user, index) => {
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
                                    ${user.role}
                                </td>
                                <td class= "product__actions">
                                    <button class="product__action-btn" onclick="deleteUser(${index})"> 
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    <button class="product__action-btn btn-edit" onclick="editUser(${index})">
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

function addUser(evt) {
    evt.preventDefault();

    console.dir(evt.target);
    console.log(evt.target);

    const elements = evt.target.elements


    const newUser = {
        name: elements.name.value,
        email: elements.email.value,
        role: elements.role.value,
    };
    const newFormData = new FormData(evt.target);
    const newuserFormData = Object.fromEntries(newFormData);

    console.log(newUser);

    if(editIndex >= 0) {
        users[editIndex] = newUser
        showAlert(`El usuario se edito correctamente`)
        return
    } else {
        users.push(newUser)
        showAlert(`El usuario se agrego correctamente`)
    }

    localStorage.setItem("users", JSON.stringify(users))
    editIndex = undefined

    userBtn.classList.remove('edit-btn')
    userBtn.innerText = 'Cargar usuario'

    console.log(users)

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

