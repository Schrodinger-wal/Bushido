const registerForm = document.querySelector('#registerForm');
const registerBtn = document.getElementById ('registerSubmit');

registerForm.addEventListener ("submit", (event) => {


    console.log(event)

    event.preventDefault();

    const element = event.target.elements;

    if (element.password1.value !== element.password2.value) {
        console.warn(`El password no consigue`);
        return;
    } 

    const users = JSON.parse(localStorage.getItem('users')) || [] ;
    // si es null, es un array vacio [] para que no nos rompa el codigovich || [] = (o un array vacio)

    const userEmailExist = users.some((usr) => usr.email === element.email.value);


    if (userEmailExist) {
        console.warn(`El correo electrónico ya existe`);
        return;
    }


    const user = {
        name: element.fullName.value,
        email: element.email.value,
        password: element.password1.value,
        age: element.age.valueAsNumber,
        born: element.born.valueAsNumber,
        genre: element.genre.value,
        country: element.country.value,
        role: 'USER_ROLE',
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    console.log(`Usuario agregado: ${JSON.stringify(user)}`);

    registerForm.reset();
});

//!!!!!!! INCORPORAR SWEET ALERT CUANDO EL MAIL YA EXISTE Y CUANDO EL USUSARIO ES CREADOVICH
