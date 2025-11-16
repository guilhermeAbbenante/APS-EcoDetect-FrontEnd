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

            if(data.success === 0){
                alert(data.message || "Erro ao processar a imagem.");
                return data;
            }

            let dataFormatada = "Data não disponível";

            if(data.lixo.data){
                dataFormatada = new Date(data.lixo.data.replace(" ", "T")); // Corrige o formato ISO
        
                dataFormatada = dataFormatada.toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                });
            }

            let endereco = "Endereço não disponível";
            if(data.lixo.rua && data.lixo.cidade && data.lixo.estado){
                endereco = data.lixo.rua + ', ' + data.lixo.cidade + ', ' + data.lixo.estado;
            }

            if(data.success){
                abrirModal({
                    title: data.message,
                    img: `${front_url}${data.lixo.imagem || ''}`,
                    local: endereco,
                    data: dataFormatada
                });
            } else {
                alert(data.message || "Erro ao processar a imagem.");
            }
            return data;
        } catch (error) {
            alert("Erro ao enviar o arquivo: " + error.message);
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

    // 🔹 Função para abrir a modal
    function abrirModal(dados) {
        const title = document.getElementById("modal-title");
        const modal = document.getElementById("modal-info");
        const img = document.getElementById("modal-img");
        const local = document.getElementById("modal-local");
        const data = document.getElementById("modal-data");

        title.textContent = dados.title || "Detalhes da Ocorrência";
        img.src = dados.img;
        local.textContent = dados.local;
        data.textContent = `Data e hora: ${dados.data}`;
        modal.style.display = "block";

        document.querySelector(".close-btn").onclick = () => modal.style.display = "none";
        window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };
    }

});
