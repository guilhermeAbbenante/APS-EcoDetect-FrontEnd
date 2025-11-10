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

    checkLoginState();
});

