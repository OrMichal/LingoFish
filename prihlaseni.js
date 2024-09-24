var inputName = document.getElementById('username');
var inputPswrd = document.getElementById('password');

var LgnButton = document.getElementById('logInButton');


const ResAPI = async (e) => {
    try {
        const res = await fetch('http://localhost:3000/users', {
            method: 'GET'
        });

        if (!res.ok) {
            throw new Error('Chyba při načítání dat z API.');
        }

        const data = await res.json();
        inputPswrd.value = data.name1;
    } catch (error) {
        console.error('Chyba:', error.message);
    }
};

LgnButton.addEventListener('click', ResAPI);