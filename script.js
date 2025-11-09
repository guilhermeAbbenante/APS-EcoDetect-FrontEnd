document.addEventListener('DOMContentLoaded', function() {

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navbar nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Alterna o ícone do menu
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    const togglePasswordElements = document.querySelectorAll('.toggle-password');

    togglePasswordElements.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const passwordInput = document.getElementById(targetId);
            const toggleImage = this.querySelector('img');
            
            if (passwordInput && toggleImage) {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                if (type === 'password') {
                    // Se a senha está oculta, mostra o olho aberto
                    toggleImage.src = 'icons/olhoaberto.png';
                    toggleImage.alt = 'Mostrar Senha';
                } else {
                    // Se a senha está visível, mostra o olho fechado
                    toggleImage.src = 'icons/olhofechado.png';
                    toggleImage.alt = 'Ocultar Senha';
                }
            }
        });
    });

    // --- Interatividade detectar.html
    const uploadBox = document.querySelector('.upload-box');
    const fileUpload = document.querySelector('#file-upload');
    const uploadLabel = document.querySelector('label[for="file-upload"]');

    if (uploadBox) {
        uploadBox.addEventListener('click', (e) => {
            if (e.target !== fileUpload && e.target !== uploadLabel) {
                fileUpload.click();
            }
        });

        // Adiciona classes para feedback de arrastar
        uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = 'var(--primary-color)';
            uploadBox.style.color = 'var(--primary-color)';
        });

        uploadBox.addEventListener('dragleave', () => {
            uploadBox.style.borderColor = 'var(--border-color)';
            uploadBox.style.color = 'var(--text-color)';
        });

        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = 'var(--border-color)';
            uploadBox.style.color = 'var(--text-color)';
            
            if (e.dataTransfer.files.length > 0) {
                fileUpload.files = e.dataTransfer.files;
                handleFileUpload(fileUpload.files[0]); // Simula o upload
            }
        });

        fileUpload.addEventListener('change', () => {
            if (fileUpload.files.length > 0) {
                handleFileUpload(fileUpload.files[0]); // Simula o upload
            }
        });

        function handleFileUpload(file) {
            console.log('Arquivo selecionado:', file.name);
            
            alert('Imagem enviada para análise (simulação): ' + file.name);
        }
    }

    //CÓDIGO DE SIMULAÇÃO DE LOGIN

    const btnEntrar = document.getElementById('btn-entrar');
    const btnPerfil = document.getElementById('btn-perfil');
    const navPic = document.getElementById('nav-pic');

    async function checkLoginState() {
        // const token = JSON.parse(localStorage.getItem('ecoUser'));
        // console.log("TOKEN ==> ", token)

        // if (user && user.loggedIn) {
    //         if (btnEntrar) btnEntrar.style.display = 'none';
    //         if (btnPerfil) btnPerfil.style.display = 'block';
    //         if (navPic) navPic.src = user.avatar || 'icons/avatar-padrao.svg'; // Alterado

    //     if (document.getElementById('perfil')) {
    //         const nomeInput = document.getElementById('nome');
    //         const emailInput = document.getElementById('email');
    //         const avatarPreview = document.getElementById('avatar-preview');

    //         if (nomeInput) nomeInput.value = user.nome || '';
    //         if (emailInput) emailInput.value = user.email || '';
    //         if (avatarPreview) avatarPreview.src = user.avatar || 'icons/avatar-padrao.svg'; // Alterado
    //     }
    // } else {
    //     if (btnEntrar) btnEntrar.style.display = 'block';
    //     if (btnPerfil) btnPerfil.style.display = 'none';
    // }
}

    //LÓGICA (login.html)
    // const loginForm = document.getElementById('login-form');
    // if (loginForm) {
    //     loginForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         const email = document.getElementById('email').value;
    //         const senha = document.getElementById('senha').value;
            
    //         // Simulação
    //         if (email && senha) {
    //             const user = {
    //                 loggedIn: true,
    //                 email: email,
    //                 nome: "Usuário Simulado",
    //                 avatar: localStorage.getItem('ecoUserAvatar') || 'icons/avatar-padrao.svg'
    //             };
    //             localStorage.setItem('ecoUser', JSON.stringify(user));
                
    //             alert('Login bem-sucedido! Redirecionando...');
    //             window.location.href = 'index.html';
    //         } else {
    //             alert('Por favor, preencha email e senha.');
    //         }
    //     });
    // }

    //LÓGICA perfil.html
    const perfilForm = document.getElementById('perfil-form');
    const avatarUpload = document.getElementById('avatar-upload');
    const btnLogout = document.getElementById('btn-logout');

    if (perfilForm) {
        // Salvar dados do perfil
        perfilForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const user = JSON.parse(localStorage.getItem('ecoUser'));
            if (user) {
                user.nome = document.getElementById('nome').value;
                // A senha não é salva nesta simulação
                localStorage.setItem('ecoUser', JSON.stringify(user));
                alert('Perfil salvo com sucesso!');
            }
        });
    }

    if (avatarUpload) {
        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Converte a imagem para Base64 para salvar no localStorage
                const reader = new FileReader();
                reader.onload = function(event) {
                    const avatarUrl = event.target.result;
                    const user = JSON.parse(localStorage.getItem('ecoUser'));
                    if (user) {
                        user.avatar = avatarUrl;
                        localStorage.setItem('ecoUser', JSON.stringify(user));
                        
                        document.getElementById('avatar-preview').src = avatarUrl;
                        document.getElementById('nav-pic').src = avatarUrl;
                        alert('Foto de perfil atualizada!');
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja sair?')) {
                localStorage.removeItem('ecoUser');
                alert('Você foi desconectado.');
                window.location.href = 'index.html'; // Redireciona para a home
            }
        });
    }

    checkLoginState();
});

