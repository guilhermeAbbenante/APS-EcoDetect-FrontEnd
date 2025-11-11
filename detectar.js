import { getUser } from './verify-user.js';
import { front_url } from './config.js';

const sectionLogin = document.getElementById("isLogin");
const sectionDetectar = document.getElementById("detectar");

(async () => {
    const user = await getUser();

    console.log(user)
    if(user && user.id) {
        sectionLogin.style.display = "none";   
        sectionDetectar.style.display = "block";
    } else {
        sectionLogin.style.display = "block";   
        sectionDetectar.style.display = "none";
    }
})();



document.addEventListener('DOMContentLoaded', () => {

    async function salvarLixo(file) {
        const token = localStorage.getItem('ecoUser');
        
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${front_url}/lixo/registrar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
            
            const data = await response.json();
            console.log("Dados recebidos:", data);
            alert(`Resultado da análise: ${data.message}`);
            return data;
        } catch (error) {
            alert('Erro ao enviar a imagem para análise: ' + error.message);
            return null; 
        }
    }

    document.querySelector('#file-upload').addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        console.log("Arquivo selecionado:", file.name);

        // Exibe o loading
        document.getElementById('loading').style.display = 'flex';

        const resultado = await salvarLixo(file);
        console.log("Resposta da API:", resultado);

        // Esconde o loading
        document.getElementById('loading').style.display = 'none';
    });

});
