import { front_url } from './config.js';

document.addEventListener('DOMContentLoaded', () => {

    async function fetchMockOcorrencias() {
        const token = localStorage.getItem('ecoUser');
        try {
            const response = await fetch(
                `${front_url}/lixo/consultar?user=3`, 
                {
                    method: 'GET', 
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao buscar dados da API:", error);
            return []; 
        }
    }

    async function carregarMarcadores() {
        try {
            let locais;
            const mapElement = document.querySelector('gmp-map');
            const statNumber = document.querySelector('.stat-number-status');
            const statNumberTotal = document.querySelector('.stat-number-status-total');
            const listaContainer = document.getElementById('lista-lixos-container');

            if (!mapElement) {
                console.error('Elemento <gmp-map> não foi encontrado no DOM.');
                return;
            }

            const ocorrencias = await fetchMockOcorrencias();

            if (listaContainer) listaContainer.innerHTML = '';

            ocorrencias.forEach((local, i) => {

                const marker = document.createElement('gmp-advanced-marker');
                marker.setAttribute('position', `${local.latitude},${local.longitude}`);
                marker.setAttribute('title', `Ocorrência: ${i}`);

                const imgUrl = `${front_url}${local.imagem || ''}`;

                let localTexto = "Não disponível";
                if(local.rua && local.cidade && local.estado){
                    localTexto = `${local.rua}, ${local.cidade}, ${local.estado}`;
                }

                let dataTexto = "Não disponível";
                if(local.data){
                    dataTexto = new Date(local.data.replace(" ", "T")); // Corrige o formato ISO
        
                    dataTexto = dataTexto.toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    });
                }

                // 🔹 Clique no marcador abre modal
                marker.addEventListener('click', () => {
                    abrirModal({
                        img: imgUrl,
                        local: localTexto,
                        data: dataTexto
                    });
                });

                mapElement.appendChild(marker);
                locais = i;

                // 🔹 Cria card da lista
                if (listaContainer) {
                    const card = document.createElement('div');
                    card.classList.add('lixo-card');
                    card.innerHTML = `
                        <img src="${imgUrl}" alt="Lixo detectado">
                        <div class="lixo-card-content">
                            <h4>${localTexto}</h4>
                            <p>${dataTexto}</p>
                        </div>
                    `;

                    // 🔹 Clique no card também abre modal
                    card.addEventListener('click', () => {
                        abrirModal({
                            img: imgUrl,
                            local: localTexto,
                            data: dataTexto
                        });
                    });

                    listaContainer.appendChild(card);
                }
            });

            // Atualiza contadores
            if (locais !== undefined) {
                statNumber.textContent = locais + 1;
                statNumberTotal.textContent = locais + 1;
            } else {
                statNumber.textContent = 0;
                statNumberTotal.textContent = 0;
            }

        } catch (error) {
            console.error('Erro ao carregar marcadores no mapa:', error);
        }
    }

    // 🔹 Função para abrir a modal
    function abrirModal(dados) {
        const modal = document.getElementById("modal-info");
        const img = document.getElementById("modal-img");
        const local = document.getElementById("modal-local");
        const data = document.getElementById("modal-data");

        img.src = dados.img;
        local.textContent = dados.local;
        data.textContent = `Data e hora: ${dados.data}`;
        modal.style.display = "block";

        document.querySelector(".close-btn").onclick = () => modal.style.display = "none";
        window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };
    }

    carregarMarcadores();
});
