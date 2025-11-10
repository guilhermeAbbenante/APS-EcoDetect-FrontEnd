import { getUser } from './verify-user.js';
import { front_url } from './config.js';

(async () => {
    await getUser();
})();

const perfilForm = document.getElementById('perfil-form');
const avatarUpload = document.getElementById('avatar-upload');
const btnLogout = document.getElementById('btn-logout');
const preview = document.getElementById("avatar-preview");
var file;

if (perfilForm) {
    perfilForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const token = localStorage.getItem('ecoUser');

        const formData = new FormData();
        formData.append("username", document.getElementById('nome').value);
        formData.append("email", document.getElementById('email').value);
        formData.append("old_password", document.getElementById('old-senha').value);
        formData.append("new_password", document.getElementById('nova-senha').value);
        formData.append("new_password_confirm", document.getElementById('nova-senha').value);

        if(file) {
            formData.append("image", file);
        }

        const response = await fetch(`${front_url}/users/update`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`, 
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            if (data && data.detail) {
                alert(data.detail);
                return;
            }

            alert(response.status);
            throw new Error(`Erro na API: ${response.status}`);
        }

        localStorage.setItem('ecoUser', data.access_token);

        window.location.reload();
    });
}

avatarUpload.addEventListener("change", function (e) {
  file = e.target.files[0] 
  if (file) {
    preview.src = URL.createObjectURL(file);

    preview.onload = () => URL.revokeObjectURL(preview.src);
  }
});

if (btnLogout) {
    btnLogout.addEventListener('click', function () {
        if (confirm('Tem certeza que deseja sair?')) {
            localStorage.removeItem('ecoUser');
            alert('Você foi desconectado.');
            window.location.href = 'index.html'; 
        }
    });
}
