import { front_url } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Função que SIMULA a busca de dados da API.
     */
    async function fetchMockOcorrencias() {
        
        // Dados mocados que sua API retornaria
        // const mockData = [
        //     { id: 1, title: "Descarte irregular na Praça da Sé", lat: -23.5505, lng: -46.6333 },
        //     { id: 2, title: "Entulho perto do MASP", lat: -23.5610, lng: -46.6559 },
        //     { id: 3, title: "Lixo acumulado no Parque Ibirapuera", lat: -23.5882, lng: -46.6588 },
        //     { id: 4, title: "Ponto viciado - R. Augusta", lat: -23.5540, lng: -46.6620 }
        // ];

        // return mockData;
        
        const token = localStorage.getItem('ecoUser');

        try {
            //Tornar dinamico
        const response = await fetch(
                `${front_url}/lixo/consultar?user=3`, 
                {
                    method: 'GET', 
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                }
            );
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`);
            }
            const data = await response.json();
            console.log("data ==> ", data)
            return data;
        } catch (error) {
            console.error("Erro ao buscar dados da API real:", error);
            return []; 
        }
        
    }

    async function carregarMarcadores() {
        try {
            let locais;
            const mapElement = document.querySelector('gmp-map');
            const statNumber = document.querySelector('.stat-number-status');
            const statNumberTotal = document.querySelector('.stat-number-status-total');
            
            if (!mapElement) {
                console.error('Elemento <gmp-map> não foi encontrado no DOM.');
                return;
            }

            const ocorrencias = await fetchMockOcorrencias();

            ocorrencias.forEach((local, i) => {
                const marker = document.createElement('gmp-advanced-marker');
                
                if(local.longitude != '') {
                    marker.setAttribute('position', `${local.latitude},${local.longitude}`);
                    marker.setAttribute('title', `Ocorrência: ${i}`);
                    
                    mapElement.appendChild(marker);

                    locais = i;
                }
            });

            statNumber.textContent = locais + 1;
            statNumberTotal.textContent = locais + 1;
        } catch (error) {
            console.error('Erro ao carregar marcadores no mapa:', error);
        }
    }

    carregarMarcadores();
});