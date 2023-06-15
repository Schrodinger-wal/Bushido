const loginForm = document.getElementById('loginForm')
const URL = 'http://localhost:1400/api'

loginForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const {email, password} = loginForm.elements;

    try {
        const body = {
            email: loginForm.email.value,
            password: loginForm.password.value
        }
        
        const resp = await axios.post(`${URL}/login`, body)

        const {token, user, msg} = resp.data;

        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user))

        showAlert (msg)
        setTimeout(() => {
            window.location.href = "/index";
        }, 1500)
    } catch (error) {
        console.log(error)

    }
});
