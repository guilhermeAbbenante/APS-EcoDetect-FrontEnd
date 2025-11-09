import { front_url } from './config.js';
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        // Simulação
        if (email && senha) {
            // const user = {
            //     loggedIn: true,
            //     email: email,
            //     nome: "Usuário Simulado",
            //     avatar: localStorage.getItem('ecoUserAvatar') || 'icons/avatar-padrao.svg'
            // };
            const response = await fetch(
                `${front_url}/users/login`, 
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                                
                        body: JSON.stringify({
                            email: email,
                            password: senha
                        })
                    }
            );

            if (!response.ok) {
                alert('Usuário não encontrado.')
                throw new Error(`Erro na API: ${response.status}`);
            }

            const data = await response.json();

            localStorage.setItem('ecoUser', data.access_token);

            alert('Login bem-sucedido! Redirecionando...');
            window.location.href = 'index.html';
        } else {
            alert('Por favor, preencha email e senha.');
        }
    });
}