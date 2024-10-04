const inputName = document.getElementById('username');
const inputPswrd = document.getElementById('password');

const LgnButton = document.getElementById('logInButton');


const ResAPI = async (e) => {
    try {
        const res = await fetch('http://localhost:3123/users', {
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

LgnButton.addEventListener('click', ResAPI());