import { front_url } from './config.js';

const registerForm = document.getElementById('cadastro-form');

if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const response = await fetch(
            `${front_url}/users/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    username: nome,
                    email: email,
                    password: senha,
                })
            }
        );

        if (!response.ok) {
            const data = await response.json()

            if (data && data.detail) {
                alert(data.detail);
                return;
            }

            alert(response.status);
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json()

        localStorage.setItem('ecoUser', data.access_token);

        alert('Cadastro bem-sucedido! Redirecionando...');
        window.location.href = 'index.html';
    })
}