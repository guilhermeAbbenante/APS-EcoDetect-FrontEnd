import { front_url } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const btnEntrar = document.getElementById('btn-entrar');
    const btnPerfil = document.getElementById('btn-perfil');
    const navPic = document.getElementById('nav-pic');
    const token = localStorage.getItem('ecoUser');

    if (token) {
        const response = await fetch(
            `${front_url}/users/get-user`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        );

        if (!response.ok) {
            alert('Login expirado')
            window.location.href = 'login.html';
            return;
        }

        const data = await response.json();

        if (data ) {
            if (btnEntrar) btnEntrar.style.display = 'none';
            if (btnPerfil) btnPerfil.style.display = 'block';
            if (navPic) navPic.src = user.avatar || 'icons/avatar-padrao.svg'; // Alterado

            if (document.getElementById('perfil')) {
                const nomeInput = document.getElementById('nome');
                const emailInput = document.getElementById('email');
                const avatarPreview = document.getElementById('avatar-preview');

                if (nomeInput) nomeInput.value = data.name || '';
                if (emailInput) emailInput.value = data.email || '';
                if (avatarPreview) avatarPreview.src = user.avatar || 'icons/avatar-padrao.svg'; // Alterado
            }
        } else {
            if (btnEntrar) btnEntrar.style.display = 'block';
            if (btnPerfil) btnPerfil.style.display = 'none';
        }
    }
})

let user = null;

// Sempre usar ela para pegar os dados do usuário
export async function getUser() {
    if (user) return user;

    const token = localStorage.getItem('ecoUser');
    if (!token) return null;

    const response = await fetch(`${front_url}/users/get-user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) return null;

    user = await response.json();
    return user;
}