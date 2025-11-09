import { getUser } from './verify-user.js';

(async () => {
    // Adicionar os outros campos
    const user = await getUser();

    document.getElementById('email').value = user.email;

    console.log("Usuário:", user.email);
})();

// const btnLogout = document.getElementById('btn-logout');

// if (btnLogout) {
//     btnLogout.addEventListener('click', function () {
//         if (confirm('Tem certeza que deseja sair?')) {
//             localStorage.removeItem('ecoUser');
//             alert('Você foi desconectado.');
//             window.location.href = 'index.html'; // Redireciona para a home
//         }
//     });
// }