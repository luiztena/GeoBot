// Centro aproximado do campus da UFRA (Belém)
const map = L.map('map').setView(
  [-1.4583, -48.4358],
  17
);

// Camada de satélite do Esri
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: 'Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

// Ícone personalizado para plantas
const plantIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Função para carregar e processar os dados do JSON
async function carregarPlantas() {
  try {
    // Faz a requisição para o arquivo JSON
    const response = await fetch('data/processed/data.json');
    
    if (!response.ok) {
      throw new Error(`Erro ao carregar dados: ${response.status} ${response.statusText}`);
    }
    
    const plantas = await response.json();
    
    // Verificar se há dados
    if (!plantas || plantas.length === 0) {
      console.warn('Nenhuma planta encontrada no arquivo JSON.');
      return;
    }
    
    console.log(`Dados carregados: ${plantas.length} plantas encontradas.`);
    
    // Adicionar marcadores para cada planta
    plantas.forEach(planta => {
      // Verificar se a planta tem coordenadas válidas
      if (planta.latitude && planta.longitude) {
        const marker = L.marker([planta.latitude, planta.longitude], {
          icon: plantIcon
        }).addTo(map);

        // Criar popup com informações da planta
        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 10px 0; color: #2d5016; font-size: 16px; border-bottom: 2px solid #4a7c2c; padding-bottom: 5px;">
              ${planta.nome}
            </h3>
            <p style="margin: 5px 0;"><strong>🌿 Família:</strong> ${planta.familia}</p>
            <p style="margin: 5px 0;"><strong>📍 Local:</strong> ${planta.local}</p>
            <p style="margin: 5px 0;"><strong>📝 Descrição:</strong> ${planta.descricao}</p>
            <p style="margin: 5px 0;"><strong>👤 Coletor:</strong> ${planta.coletor}</p>
            ${planta.determinator ? `<p style="margin: 5px 0;"><strong>🧑🏽‍🔬 Determinator:</strong> ${planta.determinator}</p>` : ''}
            <p style="margin: 5px 0;"><strong>📅 Data:</strong> ${planta.data}</p>
            <p style="margin: 5px 0; font-size: 11px; color: #666;"><strong>🗺️ Coordenadas:</strong> ${planta.coordenadas || `${planta.latitude}, ${planta.longitude}`}</p>
          </div>
        `;

        marker.bindPopup(popupContent);
      } else {
        console.warn(`Planta "${planta.nome}" não tem coordenadas válidas.`);
      }
    });

    // Ajustar o mapa para mostrar todos os marcadores
    const plantasComCoordenadas = plantas.filter(p => p.latitude && p.longitude);
    if (plantasComCoordenadas.length > 0) {
      const bounds = L.latLngBounds(plantasComCoordenadas.map(p => [p.latitude, p.longitude]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 18 });
    }

  } catch (error) {
    console.error('Erro ao carregar os dados das plantas:', error);
    
    // Mensagem de erro no mapa
    L.popup()
      .setLatLng([-1.4583, -48.4358])
      .setContent(`
        <div style="text-align: center; padding: 20px;">
          <h3 style="color: #d32f2f;">❌ Erro ao carregar dados</h3>
          <p>${error.message}</p>
          <p>Verifique se o arquivo <strong>data/processed/data.json</strong> existe.</p>
        </div>
      `)
      .openOn(map);
  }
}

// Iniciar o carregamento dos dados
carregarPlantas();