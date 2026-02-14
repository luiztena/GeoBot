// Centro aproximado do campus da UFRA (Belém)
const map = L.map('map').setView(
  [-1.4583, -48.4358],
  17
);

// Camada de satélite do Esri
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

// ============================================================================
// DEFINIÇÃO DOS ÍCONES
// ============================================================================

// Ícone verde para plantas com coordenadas precisas
const plantIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Ícone amarelo para plantas com coordenadas "levemente impreciso"
const plantIconImpreciso = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// ============================================================================
// DEFINIÇÃO DAS ÁREAS (BUFFERS) DO CAMPUS
// ============================================================================

const areas = [
  {
    nome: "Prédio Central",
    centro: [-1.458431, -48.434803],
    area: "25.738,84 m²",
    perimetro: "641,22 m",
    cor: "#e74c3c",
    coordenadas: [
      [-1.458183362276323, -48.43587239929257],
      [-1.459378885845616, -48.43499455742015],
      [-1.458534307891755, -48.4337978003477],
      [-1.45743137192158, -48.43463997730101],
      [-1.458183362276323, -48.43587239929257]
    ]
  },
  {
    nome: "Garagem/Espaço Ambiental",
    centro: [-1.457908, -48.436067],
    area: "24.408,72 m²",
    perimetro: "758,39 m",
    cor: "#3498db",
    coordenadas: [
      [-1.458343227864469, -48.43737916307783],
      [-1.458946096126271, -48.43696281324612],
      [-1.457388797500003, -48.43478533367701],
      [-1.456776043428554, -48.43520341515282],
      [-1.458343227864469, -48.43737916307783]
    ]
  },
  {
    nome: "ICA",
    centro: [-1.45525, -48.438622],
    area: "43.964,22 m²",
    perimetro: "842,09 m",
    cor: "#9b59b6",
    coordenadas: [
      [-1.453795783944828, -48.43910677067287],
      [-1.456159048161427, -48.44036584560944],
      [-1.457614521126324, -48.43885189961609],
      [-1.454702561735958, -48.43723531383767],
      [-1.453795783944828, -48.43910677067287]
    ]
  },
  {
    nome: "Trilha",
    centro: [-1.456806, -48.437097],
    area: "104.511,03 m²",
    perimetro: "1.306,41 m",
    cor: "#f39c12",
    tipo: "linha",
    coordenadas: [
      [-1.457581365087003, -48.43866496394642],
      [-1.458521129876113, -48.43733390337584],
      [-1.456470089769234, -48.43484471563767],
      [-1.454767715708487, -48.43716365849365]
    ]
  },
  {
    nome: "Estrada da Várzea",
    centro: [-1.462669, -48.435647],
    area: "79.092,27 m²",
    perimetro: "1.435,06 m",
    cor: "#1abc9c",
    coordenadas: [
      [-1.465064082792931, -48.43485491591012],
      [-1.464438011567051, -48.43361784285199],
      [-1.460093322234074, -48.43672734489858],
      [-1.460703570370999, -48.43759917641376],
      [-1.465064082792931, -48.43485491591012]
    ]
  }
];

// Adicionar as áreas ao mapa
areas.forEach(area => {
  if (area.tipo === "linha") {
    // Trilha como polyline
    const polyline = L.polyline(area.coordenadas, {
      color: area.cor,
      weight: 4,
      opacity: 0.8
    }).addTo(map);
    
    polyline.bindPopup(`
      <div style="min-width: 200px;">
        <h3 style="margin: 0 0 10px 0; color: ${area.cor}; font-size: 16px; border-bottom: 2px solid ${area.cor}; padding-bottom: 5px;">
          ${area.nome}
        </h3>
        <p style="margin: 5px 0;"><strong>📏 Área:</strong> ${area.area}</p>
        <p style="margin: 5px 0;"><strong>📐 Perímetro:</strong> ${area.perimetro}</p>
      </div>
    `);
  } else {
    // Áreas como polígonos
    const polygon = L.polygon(area.coordenadas, {
      color: area.cor,
      fillColor: area.cor,
      fillOpacity: 0.2,
      weight: 2
    }).addTo(map);
    
    polygon.bindPopup(`
      <div style="min-width: 200px;">
        <h3 style="margin: 0 0 10px 0; color: ${area.cor}; font-size: 16px; border-bottom: 2px solid ${area.cor}; padding-bottom: 5px;">
          ${area.nome}
        </h3>
        <p style="margin: 5px 0;"><strong>📏 Área:</strong> ${area.area}</p>
        <p style="margin: 5px 0;"><strong>📐 Perímetro:</strong> ${area.perimetro}</p>
      </div>
    `);
  }
  
  // Adicionar marcador no centro de cada área
  const marker = L.circleMarker(area.centro, {
    radius: 8,
    fillColor: area.cor,
    color: '#fff',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(map);
  
  marker.bindPopup(`
    <div style="text-align: center;">
      <strong>${area.nome}</strong><br>
      <small>Centro da área</small>
    </div>
  `);
});

// ============================================================================
// CARREGAMENTO E CLUSTERING DAS PLANTAS
// ============================================================================

// Criar grupo de clusters
const markers = L.markerClusterGroup({
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  spiderfyOnMaxZoom: true,
  removeOutsideVisibleBounds: true,
  iconCreateFunction: function(cluster) {
    const childCount = cluster.getChildCount();
    let c = ' marker-cluster-';
    
    if (childCount < 10) {
      c += 'small';
    } else if (childCount < 50) {
      c += 'medium';
    } else {
      c += 'large';
    }
    
    return new L.DivIcon({
      html: '<div><span>' + childCount + '</span></div>',
      className: 'marker-cluster' + c,
      iconSize: new L.Point(40, 40)
    });
  }
});

// Função para carregar e processar os dados do JSON
async function carregarPlantas() {
  try {
    const response = await fetch('data/processed/data.json');
    
    if (!response.ok) {
      throw new Error(`Erro ao carregar dados: ${response.status} ${response.statusText}`);
    }
    
    const plantas = await response.json();
    
    if (!plantas || plantas.length === 0) {
      console.warn('Nenhuma planta encontrada no arquivo JSON.');
      return;
    }
    
    console.log(`✅ Dados carregados: ${plantas.length} plantas encontradas.`);
    
    // Contadores para estatísticas
    let precisos = 0;
    let imprecisos = 0;
    
    // Adicionar marcadores para cada planta
    plantas.forEach(planta => {
      if (
        typeof planta.latitude === 'number' &&
        typeof planta.longitude === 'number'
      ) {
        // Escolher ícone baseado na precisão
        const icone = (planta.precisao === 'levemente impreciso') 
          ? plantIconImpreciso 
          : plantIcon;
        
        // Incrementar contadores
        if (planta.precisao === 'levemente impreciso') {
          imprecisos++;
        } else {
          precisos++;
        }
        
        const marker = L.marker([planta.latitude, planta.longitude], {
          icon: icone
        });

        // Adicionar aviso de precisão se aplicável
        const avisPrecisao = (planta.precisao === 'levemente impreciso')
          ? '<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 8px; margin: 10px 0; border-radius: 4px;"><strong>⚠️ Atenção:</strong> Coordenadas levemente imprecisas</div>'
          : '';

        // Criar popup com informações da planta
        const popupContent = `
          <div style="min-width: 250px; max-width: 350px;">
            <h3 style="margin: 0 0 10px 0; color: #2d5016; font-size: 16px; border-bottom: 2px solid #4a7c2c; padding-bottom: 5px;">
              ${planta.nome}
            </h3>
            ${planta['nome-vulgar'] ? `<p style="margin: 5px 0; font-style: italic; color: #666;"><strong>Nome popular:</strong> ${Array.isArray(planta['nome-vulgar']) ? planta['nome-vulgar'].join(', ') : planta['nome-vulgar']}</p>` : ''}
            ${avisPrecisao}
            <p style="margin: 5px 0;"><strong>🌿 Família:</strong> ${planta.familia || 'Não informada'}</p>
            ${planta.descricao ? `<p style="margin: 5px 0;"><strong>📝 Descrição:</strong> ${planta.descricao}</p>` : ''}
            <p style="margin: 5px 0;"><strong>📍 Local:</strong> ${planta.local || 'Não informado'}</p>
            <p style="margin: 5px 0;"><strong>👤 Coletor:</strong> ${planta.coletor || 'Não informado'}</p>
            ${planta.determinator ? `<p style="margin: 5px 0;"><strong>🧑🏽‍🔬 Determinador:</strong> ${planta.determinator}</p>` : ''}
            <p style="margin: 5px 0;"><strong>📅 Data:</strong> ${planta.data || 'Não informada'}</p>
            <p style="margin: 5px 0; font-size: 11px; color: #666;"><strong>🗺️ Coordenadas:</strong> ${planta.coordenadas || `${planta.latitude.toFixed(6)}, ${planta.longitude.toFixed(6)}`}</p>
            <p style="margin: 5px 0; font-size: 11px; color: #666;"><strong>🆔 ID:</strong> ${planta.id}</p>
          </div>
        `;

        marker.bindPopup(popupContent);
        markers.addLayer(marker);
      } else {
        console.warn(`⚠️ Planta "${planta.nome}" (${planta.id}) não tem coordenadas válidas.`);
      }
    });

    // Adicionar o grupo de clusters ao mapa
    map.addLayer(markers);
    
    console.log(`📊 Estatísticas: ${precisos} precisos, ${imprecisos} imprecisos`);

    // Ajustar o mapa para mostrar todos os marcadores
    const plantasComCoordenadas = plantas.filter(p => p.latitude && p.longitude);
    if (plantasComCoordenadas.length > 0) {
      const bounds = L.latLngBounds(plantasComCoordenadas.map(p => [p.latitude, p.longitude]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 17 });
    }

    // Adicionar legenda ao mapa
    adicionarLegenda(precisos, imprecisos);

  } catch (error) {
    console.error('❌ Erro ao carregar os dados das plantas:', error);
    
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

// ============================================================================
// LEGENDA
// ============================================================================

function adicionarLegenda(precisos, imprecisos) {
  const legend = L.control({ position: 'bottomright' });
  
  legend.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.style.background = 'white';
    div.style.padding = '15px';
    div.style.borderRadius = '8px';
    div.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    div.style.maxWidth = '250px';
    
    div.innerHTML = `
      <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px; border-bottom: 2px solid #2d5016; padding-bottom: 5px; color: #2d5016;">
        🗺️ Legenda do Mapa
      </div>
      
      <div style="font-weight: bold; margin-top: 10px; margin-bottom: 5px; font-size: 12px;">Plantas Coletadas:</div>
      <div style="margin: 5px 0; font-size: 11px;">
        <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" style="width: 12px; height: 20px; vertical-align: middle; margin-right: 5px;">
        <span>Coordenadas precisas (${precisos})</span>
      </div>
      <div style="margin: 5px 0; font-size: 11px;">
        <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png" style="width: 12px; height: 20px; vertical-align: middle; margin-right: 5px;">
        <span>Coordenadas imprecisas (${imprecisos})</span>
      </div>
      
      <div style="font-weight: bold; margin-top: 10px; margin-bottom: 5px; font-size: 12px;">Áreas do Campus:</div>
      ${areas.map(area => `
        <div style="margin: 5px 0; font-size: 11px;">
          <span style="display: inline-block; width: 15px; height: 15px; background-color: ${area.cor}; border: 1px solid #333; margin-right: 5px; vertical-align: middle;"></span>
          <span>${area.nome}</span>
        </div>
      `).join('')}
      
      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 10px; color: #666;">
        <strong>Total:</strong> ${precisos + imprecisos} plantas mapeadas
      </div>
    `;
    
    return div;
  };
  
  legend.addTo(map);
}

// ============================================================================
// CONTROLES ADICIONAIS
// ============================================================================

// Adicionar controle de escala
L.control.scale({
  imperial: false,
  metric: true,
  position: 'bottomleft'
}).addTo(map);

// Adicionar informações ao clicar no mapa
map.on('click', function(e) {
  console.log(`Coordenadas clicadas: ${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`);
});

// ============================================================================
// INICIALIZAR
// ============================================================================

// Iniciar o carregamento dos dados
carregarPlantas();

// Log de inicialização
console.log('🌿 Mapa Botânico UFRA inicializado');
console.log('📍 Áreas carregadas:', areas.length);