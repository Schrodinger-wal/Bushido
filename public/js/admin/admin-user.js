let Users = [];

const userForm = document.getElementById('form-user');
const userBtn = document.getElementById('userBtn');
let password1 = document.getElementById('password1');
let password2 = document.getElementById('password2');
/* /////////////////////////////////////////////// */
const passForm = document.querySelectorAll('.password-form');
const submitBtn = document.querySelector('userBtn');
const tableBody = document.getElementById('table-body');

const URL = 'http://localhost:1400/api';

userForm.addEventListener('submit', () => {
    console.dir(userForm.dataset)
})


async function cargarUsuarios() {
    try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/users` , {
        headers: {
        Authorization: token
        }
    });
  
    Users = response.data.user;
    renderizarTabla(Users);
    } catch (error) {
    console.log(error);
    }
  }

cargarUsuarios()

let editIndex = undefined;

console.log(Users)
function renderizarTabla(Users) {
    tableBody.innerHTML = "";
  
    if (Users.length === 0) {
      tableBody.innerHTML = `<tr class="disabled"> <td colspan="6">No se encontraron usuarios</td> </tr>`;
      return;
    }
  
    Users.forEach((user) => {
      const tableRow = `
        <tr class="product">
          <td class="product__name">
            ${user.name}
          </td>
          <td class="product__desc">
            ${user.email}    
          </td>
          <td class="product__price">
            ${formatDate(user.createdAt)}
          </td>
          <td class="product__price">
            ${user.country || "-"}
          </td>
          <td class="product__price">
            ${user.gender || "-"}
          </td>
          <td class="product__price">
            ${user.role}
          </td>
          <td class="product__actions">
            <button class="product__action-btn" onclick="deleteUser('${user._id}')"> 
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <button class="product__action-btn btn-edit" onclick="editUser('${user._id}')">
              <i class="fa-solid fa-pencil"></i>
            </button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += tableRow;
    });
  }
  
  // Función para formatear la fecha en el formato deseado
  function formatDate(date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate.replace(/\//g, "/");
  }
  
  // Llama a la función cargarUsuarios() para obtener los datos
  cargarUsuarios();



function formatearFecha() {

    const fecha = new Date()

let dia = String(fecha.getDate())
let mes = fecha.getMonth() + 1

const year = fecha.getFullYear()

if(dia < 10) {
    dia = '0' + dia;
}


    return `${dia}/${mes}/${year}`;
}

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
/*         age: elements.age.value, */
/*         country: elements.country.value, */
/*         gender: elements.gender.value, */
        role: elements.role.value,
    };
    const token = localStorage.getItem('token');

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

    cargarUsuarios();
    limpiar()

}

/* ===============================Reiniciar====================== */


function limpiar(){
    const el = userForm.elements;
    
    el.fullName.value = '';
    el.email.value = '';
    el.password1.value = '';
    el.password2.value = ''; 
    el.date.value = '';
    el.country.value = '',
    el.role.value = 'USER_ROLE';
}
/* ===============================DELETE====================== */

async function deleteUser(id) {
    const confirmation = await confirm(`¿Está seguro que desea eliminar este usuario?`);

    if (confirmation === true) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${URL}/users/${id}`/* , {
                headers: { Authorization: token }
            } */);
            cargarUsuarios();
        } catch (error) {
            showAlert(`Error al borrar el user`, 'error');
            console.log(error);
        }
        renderizarTabla();
    }
}

/* =======================EDIT======================= */


async function editUser(id) {
    try {
        submitBtn.classList.add('admin-product__btn');
        submitBtn.innerText = 'Editar'

        const token = localStorage.getItem('token');
        response = await axios.get (`${URL}/users/${id}`/* , {
            headers: {
                Authorization: token
            }
        } */);

        const user = response.data.user;

        const el = userForm.elements;

        el.name.value = user.name;
        el.email.value = user.email;
        password1.required = false;
        el.date.value = formatearFecha(user.date)
        el.gender.value = user.gender
        el.role.value = user.role;
        editIndex = id;
    } catch (error) {
        console.log('error')
    }
}

