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

const plantIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const plantIconImpreciso = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const plantIconHighlight = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [30, 46],
  iconAnchor: [15, 46],
  popupAnchor: [1, -40],
  shadowSize: [41, 41]
});

// ============================================================================
// DEFINIÇÃO DAS ÁREAS DO CAMPUS
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
      [-1.459864770494462, -48.43480873162439],
      [-1.459194177884795, -48.4332569317029],
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
      [-1.45869472104175, -48.43806302428993],
      [-1.459410231563968, -48.43762842206137],
      [-1.457388797500003, -48.43478533367701],
      [-1.456776043428554, -48.43520341515282],
      [-1.45869472104175, -48.43806302428993]
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
      [-1.455819023609967, -48.44093508996372],
      [-1.456879710684717, -48.43981526083133],
      [-1.457184279050957, -48.43893766829697],
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
      [-1.454853910640288, -48.43731558411459],
      [-1.457327884633712, -48.43883220630396],
      [-1.45814634360048, -48.43835964477277],
      [-1.455818210560563, -48.43591971173741],
      [-1.454930226842956, -48.43729320863234]
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

let areasLayerGroup = L.layerGroup().addTo(map);

areas.forEach(area => {
  if (area.tipo === "linha") {
    const polyline = L.polyline(area.coordenadas, {
      color: area.cor,
      weight: 5,
      opacity: 0.8,
      dashArray: '10, 5',
      lineJoin: 'round',
      lineCap: 'round'
    });
    polyline.bindPopup(`
      <div style="min-width: 200px;">
        <h3 style="margin: 0 0 10px 0; color: ${area.cor}; font-size: 16px; border-bottom: 2px solid ${area.cor}; padding-bottom: 5px;">
          🚶 ${area.nome}
        </h3>
        <p style="margin: 5px 0;"><strong>📏 Área:</strong> ${area.area}</p>
        <p style="margin: 5px 0;"><strong>📐 Perímetro:</strong> ${area.perimetro}</p>
        <p style="margin: 5px 0; font-size: 11px; color: #666;"><em>Caminho/Trilha</em></p>
      </div>
    `);
    areasLayerGroup.addLayer(polyline);
  } else {
    const polygon = L.polygon(area.coordenadas, {
      color: area.cor,
      fillColor: area.cor,
      fillOpacity: 0.2,
      weight: 3,
      opacity: 0.8
    });
    polygon.bindPopup(`
      <div style="min-width: 200px;">
        <h3 style="margin: 0 0 10px 0; color: ${area.cor}; font-size: 16px; border-bottom: 2px solid ${area.cor}; padding-bottom: 5px;">
          📍 ${area.nome}
        </h3>
        <p style="margin: 5px 0;"><strong>📏 Área:</strong> ${area.area}</p>
        <p style="margin: 5px 0;"><strong>📐 Perímetro:</strong> ${area.perimetro}</p>
        <p style="margin: 5px 0; font-size: 11px; color: #666;"><em>Polígono ajustado</em></p>
      </div>
    `);
    areasLayerGroup.addLayer(polygon);
  }

  const marker = L.circleMarker(area.centro, {
    radius: 8,
    fillColor: area.cor,
    color: '#fff',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  });
  marker.bindPopup(`
    <div style="text-align: center;">
      <strong style="color: ${area.cor};">${area.nome}</strong><br>
      <small>Centro da área</small>
    </div>
  `);
  marker.bindTooltip(area.nome, { permanent: false, direction: 'top', offset: [0, -10] });
  areasLayerGroup.addLayer(marker);
});

// ============================================================================
// CLUSTERING
// ============================================================================

const markers = L.markerClusterGroup({
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  spiderfyOnMaxZoom: true,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 80,
  disableClusteringAtZoom: 19,
  iconCreateFunction: function(cluster) {
    const childCount = cluster.getChildCount();
    let c = ' marker-cluster-';
    if (childCount < 10) c += 'small';
    else if (childCount < 50) c += 'medium';
    else c += 'large';
    return new L.DivIcon({
      html: '<div><span>' + childCount + '</span></div>',
      className: 'marker-cluster' + c,
      iconSize: new L.Point(40, 40)
    });
  }
});

let clustersAtivados = true;
let marcadoresIndividuais = [];
let todasAsPlantas = [];
let marcadoresFiltrados = [];
let pesquisaAtiva = false;

// ============================================================================
// MAPEAMENTO DE GRUPO PARA EXIBIÇÃO
// ============================================================================

const grupoConfig = {
  'Monocotiledôneas':   { emoji: '🌾', cor: '#856404', bg: '#fff3cd' },
  'Eudicotiledôneas':   { emoji: '🌿', cor: '#0c5460', bg: '#d1ecf1' },
  'Angiospermas Basais':{ emoji: '🌺', cor: '#5b1f6e', bg: '#f3d9fa' }
};

function renderGrupoBadge(grupo) {
  if (!grupo) return '';
  const cfg = grupoConfig[grupo];
  if (!cfg) return `<span style="background:#eee;border-radius:4px;padding:1px 6px;font-size:10px;font-weight:700;">${grupo}</span>`;
  return `<span style="background:${cfg.bg};color:${cfg.cor};border-radius:4px;padding:1px 6px;font-size:10px;font-weight:700;">${cfg.emoji} ${grupo}</span>`;
}

// ============================================================================
// FUNÇÕES AUXILIARES DE ANO
// ============================================================================

function extrairAno(dataStr) {
  if (!dataStr || dataStr === 'INDEFINIDO') return null;
  const match = dataStr.toString().match(/\b(19|20)\d{2}\b/);
  return match ? match[0] : null;
}

// ============================================================================
// FUNÇÕES DE PESQUISA
// ============================================================================

function normalizarTexto(texto) {
  if (!texto) return '';
  return texto.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function preencherDatalists() {
  const familias = [...new Set(todasAsPlantas.map(p => p.familia).filter(f => f))].sort();
  const generos  = [...new Set(todasAsPlantas.map(p => p.genero).filter(g => g))].sort();

  const familiasList = document.getElementById('familiasList');
  const generosList  = document.getElementById('generosList');
  if (familiasList) familiasList.innerHTML = familias.map(f => `<option value="${f}">`).join('');
  if (generosList)  generosList.innerHTML  = generos.map(g  => `<option value="${g}">`).join('');
}

function preencherFiltroAno() {
  const anos = [...new Set(
    todasAsPlantas
      .map(p => extrairAno(p.data))
      .filter(a => a !== null)
  )].sort();

  const select = document.getElementById('searchAno');
  if (!select) return;
  select.innerHTML = '<option value="">Todos os anos</option>' +
    anos.map(a => `<option value="${a}">${a}</option>`).join('');
}

window.realizarPesquisa = function() {
  const nomeFiltro         = normalizarTexto(document.getElementById('searchNome').value);
  const familiaFiltro      = normalizarTexto(document.getElementById('searchFamilia').value);
  const generoFiltro       = normalizarTexto(document.getElementById('searchGenero').value);
  const determinadorFiltro = normalizarTexto(document.getElementById('searchDeterminador').value);
  const anoFiltro          = (document.getElementById('searchAno').value || '').trim();
  const tipoFiltro         = (document.getElementById('searchTipo').value || '').trim();
  const grupoFiltro        = (document.getElementById('searchGrupo').value || '').trim();

  if (!nomeFiltro && !familiaFiltro && !generoFiltro && !determinadorFiltro && !anoFiltro && !tipoFiltro && !grupoFiltro) {
    alert('Por favor, preencha pelo menos um campo de pesquisa.');
    return;
  }

  const plantasFiltradas = todasAsPlantas.filter(planta => {
    const nomeCientifico = normalizarTexto(planta.nome);
    const nomeVulgar     = normalizarTexto(
      Array.isArray(planta['nome-vulgar'])
        ? planta['nome-vulgar'].join(' ')
        : planta['nome-vulgar']
    );
    const familia      = normalizarTexto(planta.familia);
    const genero       = normalizarTexto(planta.genero);
    const determinador = normalizarTexto(planta.determinator);
    const anoPlanta    = extrairAno(planta.data);
    const tipoPlanta   = (planta.tipo  || '').toLowerCase().trim();
    const grupoPlanta  = (planta.grupo || '').trim();

    const criterios = [];
    if (nomeFiltro)         criterios.push(nomeCientifico.includes(nomeFiltro) || nomeVulgar.includes(nomeFiltro));
    if (familiaFiltro)      criterios.push(familia.includes(familiaFiltro));
    if (generoFiltro)       criterios.push(genero.includes(generoFiltro));
    if (determinadorFiltro) criterios.push(determinador.includes(determinadorFiltro));
    if (anoFiltro)          criterios.push(anoPlanta === anoFiltro);
    if (tipoFiltro)         criterios.push(tipoPlanta === tipoFiltro);
    if (grupoFiltro)        criterios.push(grupoPlanta === grupoFiltro);

    return criterios.length > 0 && criterios.every(c => c === true);
  });

  exibirResultadosPesquisa(plantasFiltradas);
};

function exibirResultadosPesquisa(plantasFiltradas) {
  const resultsDiv = document.getElementById('searchResults');
  const countDiv   = document.getElementById('resultsCount');
  const listDiv    = document.getElementById('resultsList');

  if (plantasFiltradas.length === 0) {
    countDiv.innerHTML = '❌ Nenhuma planta encontrada com os critérios informados.';
    listDiv.innerHTML  = '';
    resultsDiv.style.display = 'block';
    atualizarMarcadoresNoMapa([]);
    return;
  }

  countDiv.innerHTML = `✅ <strong>${plantasFiltradas.length}</strong> planta(s) encontrada(s)`;

  listDiv.innerHTML = plantasFiltradas.map(planta => {
    const nomeVulgar = Array.isArray(planta['nome-vulgar'])
      ? planta['nome-vulgar'][0]
      : planta['nome-vulgar'];
    const ano = extrairAno(planta.data);

    // Badge de tipo
    const tipoEmoji = { frutifera:'🍎', medicinal:'💊', ornamental:'🌸', madeireira:'🪵', oportunista:'🌿' };
    const tipoLabel = { frutifera:'Frutífera', medicinal:'Medicinal', ornamental:'Ornamental', madeireira:'Madeireira', oportunista:'Oportunista' };
    const tipoKey   = (planta.tipo || '').toLowerCase();
    const tipoBadge = tipoKey
      ? `<span class="tipo-badge tipo-${tipoKey}">${tipoEmoji[tipoKey] || '🌱'} ${tipoLabel[tipoKey] || planta.tipo}</span>`
      : '';

    // Badge de grupo
    const grupoBadge = planta.grupo ? renderGrupoBadge(planta.grupo) : '';

    return `
      <div class="result-item" onclick="destacarPlanta('${planta.id}')">
        <strong>${planta.nome} ${tipoBadge}</strong>
        <div style="margin-top:4px;">${grupoBadge}</div>
        <small>
          ${nomeVulgar ? '🌿 ' + nomeVulgar + ' | ' : ''}
          🧑‍🔬 ${planta.determinator || 'N/I'} |
          📅 ${ano || planta.data || 'N/I'}
        </small>
      </div>
    `;
  }).join('');

  resultsDiv.style.display = 'block';
  atualizarMarcadoresNoMapa(plantasFiltradas);

  if (plantasFiltradas.length > 0) {
    const bounds = L.latLngBounds(plantasFiltradas.map(p => [p.latitude, p.longitude]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 18 });
  }
}

function atualizarMarcadoresNoMapa(plantasFiltradas) {
  pesquisaAtiva = plantasFiltradas.length > 0;
  const idsFiltrados = new Set(plantasFiltradas.map(p => p.id));

  if (clustersAtivados) {
    markers.clearLayers();
  } else {
    marcadoresIndividuais.forEach(m => map.removeLayer(m));
  }

  marcadoresFiltrados = [];

  marcadoresIndividuais.forEach(marker => {
    if (idsFiltrados.has(marker.plantaId)) {
      marker.setIcon(plantIconHighlight);
      marker.setZIndexOffset(1000);
      if (clustersAtivados) markers.addLayer(marker);
      else marker.addTo(map);
      marcadoresFiltrados.push(marker);
    }
  });

  if (!pesquisaAtiva && plantasFiltradas.length === 0) {
    restaurarTodosMarcadores();
  }
}

function restaurarTodosMarcadores() {
  marcadoresIndividuais.forEach(marker => {
    const planta = todasAsPlantas.find(p => p.id === marker.plantaId);
    const iconeOriginal = (planta && planta.precisao === 'levemente impreciso')
      ? plantIconImpreciso : plantIcon;
    marker.setIcon(iconeOriginal);
    marker.setZIndexOffset(0);
  });

  if (clustersAtivados) {
    markers.clearLayers();
    marcadoresIndividuais.forEach(m => markers.addLayer(m));
  } else {
    marcadoresIndividuais.forEach(m => m.addTo(map));
  }
}

window.destacarPlanta = function(plantaId) {
  const marker = marcadoresIndividuais.find(m => m.plantaId === plantaId);
  const planta = todasAsPlantas.find(p => p.id === plantaId);
  if (marker && planta) {
    map.setView([planta.latitude, planta.longitude], 19);
    marker.openPopup();
    const iconElement = marker.getElement();
    if (iconElement) {
      iconElement.classList.add('marker-selected');
      setTimeout(() => iconElement.classList.remove('marker-selected'), 3000);
    }
  }
};

window.limparPesquisa = function() {
  document.getElementById('searchNome').value         = '';
  document.getElementById('searchFamilia').value      = '';
  document.getElementById('searchGenero').value       = '';
  document.getElementById('searchDeterminador').value = '';
  document.getElementById('searchAno').value          = '';
  document.getElementById('searchTipo').value         = '';
  document.getElementById('searchGrupo').value        = '';  // ← limpa grupo
  document.getElementById('searchResults').style.display = 'none';

  pesquisaAtiva = false;
  restaurarTodosMarcadores();
  map.setView([-1.4583, -48.4358], 16);
};

// ============================================================================
// CARREGAMENTO DOS DADOS
// ============================================================================

async function carregarPlantas() {
  try {
    const response = await fetch('data/processed/data.json');
    if (!response.ok) throw new Error(`Erro ao carregar dados: ${response.status} ${response.statusText}`);

    const plantas = await response.json();
    if (!plantas || plantas.length === 0) {
      console.warn('Nenhuma planta encontrada no arquivo JSON.');
      return;
    }

    todasAsPlantas = plantas;
    console.log(`✅ Dados carregados: ${plantas.length} plantas encontradas.`);

    preencherDatalists();
    preencherFiltroAno();

    let precisos = 0;
    let imprecisos = 0;

    plantas.forEach(planta => {
      if (typeof planta.latitude === 'number' && typeof planta.longitude === 'number') {
        const icone = (planta.precisao === 'levemente impreciso') ? plantIconImpreciso : plantIcon;
        if (planta.precisao === 'levemente impreciso') imprecisos++; else precisos++;

        const marker = L.marker([planta.latitude, planta.longitude], { icon: icone });
        marker.plantaId = planta.id;

        const avisPrecisao = (planta.precisao === 'levemente impreciso')
          ? '<div style="background:#fff3cd;border-left:4px solid #ffc107;padding:8px;margin:10px 0;border-radius:4px;"><strong>⚠️ Atenção:</strong> Coordenadas levemente imprecisas</div>'
          : '';

        const ano = extrairAno(planta.data);

        // Popup com campo Grupo
        marker.bindPopup(`
          <div style="min-width: 250px; max-width: 350px;">
            <h3 style="margin:0 0 10px 0;color:#2d5016;font-size:16px;border-bottom:2px solid #4a7c2c;padding-bottom:5px;">
              ${planta.nome}
            </h3>
            ${planta['nome-vulgar'] ? `<p style="margin:5px 0;font-style:italic;color:#666;"><strong>Nome popular:</strong> ${Array.isArray(planta['nome-vulgar']) ? planta['nome-vulgar'].join(', ') : planta['nome-vulgar']}</p>` : ''}
            ${avisPrecisao}
            <p style="margin:5px 0;"><strong>🌿 Família:</strong> ${planta.familia || 'Não informada'}</p>
            <p style="margin:5px 0;"><strong>🔬 Gênero:</strong> ${planta.genero || 'Não informado'}</p>
            ${planta.grupo ? `<p style="margin:5px 0;"><strong>🧬 Grupo:</strong> ${renderGrupoBadge(planta.grupo)}</p>` : ''}
            ${planta.descricao ? `<p style="margin:5px 0;"><strong>📝 Descrição:</strong> ${planta.descricao}</p>` : ''}
            <p style="margin:5px 0;"><strong>📍 Local:</strong> ${planta.local || 'Não informado'}</p>
            <p style="margin:5px 0;"><strong>👤 Coletor:</strong> ${planta.coletor || 'Não informado'}</p>
            ${planta.determinator ? `<p style="margin:5px 0;"><strong>🧑🏽‍🔬 Determinador:</strong> ${planta.determinator}</p>` : ''}
            <p style="margin:5px 0;"><strong>📅 Data:</strong> ${planta.data || 'Não informada'}${ano ? ` <span style="background:#e8f5e9;color:#2d5016;border-radius:4px;padding:1px 6px;font-size:11px;margin-left:4px;">📆 ${ano}</span>` : ''}</p>
            ${planta.tipo ? (() => { const tipoEmoji={frutifera:'🍎',medicinal:'💊',ornamental:'🌸',madeireira:'🪵',oportunista:'🌿'}; const tipoLabel={frutifera:'Frutífera',medicinal:'Medicinal',ornamental:'Ornamental',madeireira:'Madeireira',oportunista:'Oportunista'}; const k=planta.tipo.toLowerCase(); return `<p style="margin:5px 0;"><strong>🏷️ Tipo:</strong> <span style="background:#f0f0f0;border-radius:4px;padding:2px 8px;font-size:12px;">${tipoEmoji[k]||'🌱'} ${tipoLabel[k]||planta.tipo}</span></p>`; })() : ''}
            <p style="margin:5px 0;font-size:11px;color:#666;"><strong>🗺️ Coordenadas:</strong> ${planta.coordenadas || `${planta.latitude.toFixed(6)}, ${planta.longitude.toFixed(6)}`}</p>
            <p style="margin:5px 0;font-size:11px;color:#666;"><strong>🆔 ID:</strong> ${planta.id}</p>
          </div>
        `);

        const tooltipText = planta['nome-vulgar']
          ? (Array.isArray(planta['nome-vulgar']) ? planta['nome-vulgar'][0] : planta['nome-vulgar'])
          : planta.nome.split(' ')[0];

        marker.bindTooltip(tooltipText, { permanent: false, direction: 'top', offset: [0, -35] });

        markers.addLayer(marker);
        marcadoresIndividuais.push(marker);
      } else {
        console.warn(`⚠️ Planta "${planta.nome}" (${planta.id}) sem coordenadas válidas.`);
      }
    });

    map.addLayer(markers);
    console.log(`📊 Estatísticas: ${precisos} precisos, ${imprecisos} imprecisos`);

    const plantasComCoordenadas = plantas.filter(p => p.latitude && p.longitude);
    if (plantasComCoordenadas.length > 0) {
      const bounds = L.latLngBounds(plantasComCoordenadas.map(p => [p.latitude, p.longitude]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 17 });
    }

    adicionarLegenda(precisos, imprecisos);

  } catch (error) {
    console.error('❌ Erro ao carregar os dados das plantas:', error);
    L.popup()
      .setLatLng([-1.4583, -48.4358])
      .setContent(`<div style="text-align:center;padding:20px;"><h3 style="color:#d32f2f;">❌ Erro ao carregar dados</h3><p>${error.message}</p><p>Verifique se o arquivo <strong>data.json</strong> existe.</p></div>`)
      .openOn(map);
  }
}

// ============================================================================
// LEGENDA
// ============================================================================

function adicionarLegenda(precisos, imprecisos) {
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'info legend');
    div.style.cssText = 'background:white;padding:15px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.3);max-width:260px;';
    div.innerHTML = `
      <div style="font-weight:bold;font-size:14px;margin-bottom:10px;border-bottom:2px solid #2d5016;padding-bottom:5px;color:#2d5016;">
        🗺️ Legenda do Mapa
      </div>

      <div style="font-weight:bold;margin-top:10px;margin-bottom:5px;font-size:12px;">🧬 Grupos Taxonômicos:</div>
      ${Object.entries(grupoConfig).map(([nome, cfg]) => `
        <div style="margin:4px 0;font-size:11px;">
          <span style="display:inline-block;background:${cfg.bg};color:${cfg.cor};border-radius:4px;padding:1px 7px;font-weight:700;font-size:11px;">${cfg.emoji} ${nome}</span>
        </div>
      `).join('')}

      <div style="font-weight:bold;margin-top:10px;margin-bottom:5px;font-size:12px;">Áreas do Campus:</div>
      ${areas.map(area => `
        <div style="margin:5px 0;font-size:11px;">
          <span style="display:inline-block;width:15px;height:15px;background-color:${area.cor};border:1px solid #333;margin-right:5px;vertical-align:middle;${area.tipo === 'linha' ? '' : 'border-radius:3px;'}"></span>
          ${area.nome}${area.tipo === 'linha' ? ' 🚶' : ''}
        </div>
      `).join('')}

      <div style="margin-top:10px;padding-top:10px;border-top:1px solid #ddd;font-size:10px;color:#666;">
        <strong>Total:</strong> ${precisos + imprecisos} plantas mapeadas<br>
        <em style="font-size:9px;">Use o painel de pesquisa para filtrar</em>
      </div>
    `;
    return div;
  };
  legend.addTo(map);
}

// ============================================================================
// CONTROLES
// ============================================================================

L.control.scale({ imperial: false, metric: true, position: 'bottomleft' }).addTo(map);

window.toggleAreas = function() {
  if (map.hasLayer(areasLayerGroup)) {
    map.removeLayer(areasLayerGroup);
  } else {
    map.addLayer(areasLayerGroup);
  }
};

window.toggleClusters = function() {
  if (clustersAtivados) {
    map.removeLayer(markers);
    const lista = pesquisaAtiva ? marcadoresFiltrados : marcadoresIndividuais;
    lista.forEach(m => m.addTo(map));
    clustersAtivados = false;
    const btn = document.querySelector('[onclick="toggleClusters()"]');
    if (btn) btn.innerHTML = '✅ Ativar Clusters';
  } else {
    marcadoresIndividuais.forEach(m => map.removeLayer(m));
    markers.clearLayers();
    const lista = pesquisaAtiva ? marcadoresFiltrados : marcadoresIndividuais;
    lista.forEach(m => markers.addLayer(m));
    map.addLayer(markers);
    clustersAtivados = true;
    const btn = document.querySelector('[onclick="toggleClusters()"]');
    if (btn) btn.innerHTML = '🔄 Desativar Clusters';
  }
};

window.mostrarEstatisticas = function() {
  // Por ano
  const porAno = {};
  todasAsPlantas.forEach(p => {
    const ano = extrairAno(p.data) || 'N/I';
    porAno[ano] = (porAno[ano] || 0) + 1;
  });
  const listaAnos = Object.keys(porAno).sort()
    .map(a => `<span style="display:inline-block;background:#e8f5e9;border-radius:4px;padding:2px 7px;margin:2px;font-size:11px;"><strong>${a}</strong>: ${porAno[a]}</span>`)
    .join('');

  // Por tipo
  const porTipo = {};
  const tipoEmoji = { frutifera:'🍎', medicinal:'💊', ornamental:'🌸', madeireira:'🪵', oportunista:'🌿' };
  const tipoLabel = { frutifera:'Frutífera', medicinal:'Medicinal', ornamental:'Ornamental', madeireira:'Madeireira', oportunista:'Oportunista' };
  todasAsPlantas.forEach(p => {
    const t = (p.tipo || 'N/I').toLowerCase();
    porTipo[t] = (porTipo[t] || 0) + 1;
  });
  const listaTipos = Object.keys(porTipo).sort()
    .map(t => `<span style="display:inline-block;background:#f0f0f0;border-radius:4px;padding:2px 7px;margin:2px;font-size:11px;">${tipoEmoji[t]||'🌱'} <strong>${tipoLabel[t]||t}</strong>: ${porTipo[t]}</span>`)
    .join('');

  // Por grupo
  const porGrupo = {};
  todasAsPlantas.forEach(p => {
    const g = p.grupo || 'N/I';
    porGrupo[g] = (porGrupo[g] || 0) + 1;
  });
  const listaGrupos = Object.keys(porGrupo).sort()
    .map(g => {
      const cfg = grupoConfig[g];
      const badge = cfg
        ? `<span style="background:${cfg.bg};color:${cfg.cor};border-radius:4px;padding:2px 7px;margin:2px;font-size:11px;display:inline-block;">${cfg.emoji} <strong>${g}</strong>: ${porGrupo[g]}</span>`
        : `<span style="background:#eee;border-radius:4px;padding:2px 7px;margin:2px;font-size:11px;display:inline-block;"><strong>${g}</strong>: ${porGrupo[g]}</span>`;
      return badge;
    }).join('');

  const stats = `
    <div style="text-align:left;padding:20px;min-width:300px;">
      <h3 style="margin-top:0;color:#2d5016;border-bottom:2px solid #4a7c2c;padding-bottom:10px;">
        📊 Estatísticas do Mapa
      </h3>
      <div style="background:#f0f8ff;padding:10px;border-radius:5px;margin:10px 0;">
        <strong>🌿 Plantas Catalogadas</strong><br>
        Total: <strong>${marcadoresIndividuais.length}</strong> espécimes
      </div>
      <div style="background:#fffbf2;padding:10px;border-radius:5px;margin:10px 0;">
        <strong>🧬 Plantas por Grupo Taxonômico</strong><br>
        <div style="margin-top:6px;">${listaGrupos}</div>
      </div>
      <div style="background:#f0fff0;padding:10px;border-radius:5px;margin:10px 0;">
        <strong>📆 Coletas por Ano</strong><br>
        <div style="margin-top:6px;">${listaAnos}</div>
      </div>
      <div style="background:#f5f0ff;padding:10px;border-radius:5px;margin:10px 0;">
        <strong>🏷️ Plantas por Tipo</strong><br>
        <div style="margin-top:6px;">${listaTipos}</div>
      </div>
      <div style="background:#fff8f0;padding:10px;border-radius:5px;margin:10px 0;">
        <strong>🗺️ Áreas Mapeadas</strong><br>
        Total: <strong>${areas.length}</strong> áreas &nbsp;|&nbsp;
        Polígonos: <strong>4</strong> &nbsp;|&nbsp;
        Trilhas: <strong>1</strong>
      </div>
      <div style="background:#f8f8f8;padding:10px;border-radius:5px;margin:10px 0;">
        <strong>⚙️ Sistema</strong><br>
        Clusters: <strong>${clustersAtivados ? '✅ Ativados' : '❌ Desativados'}</strong><br>
        Áreas visíveis: <strong>${map.hasLayer(areasLayerGroup) ? '✅ Sim' : '❌ Não'}</strong><br>
        Pesquisa ativa: <strong>${pesquisaAtiva ? '🔍 Sim' : '❌ Não'}</strong>
      </div>
      <p style="font-size:11px;color:#666;margin-top:15px;text-align:center;">
        <em>Herbário UFRA Campus Belém</em>
      </p>
    </div>
  `;

  L.popup().setLatLng(map.getCenter()).setContent(stats).openOn(map);
};

map.on('click', function(e) {
  console.log(`Coordenadas: ${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`);
});

// ============================================================================
// INICIALIZAR
// ============================================================================

carregarPlantas();

console.log('%c🌿 Mapa Botânico UFRA', 'font-size:20px;color:#2d5016;font-weight:bold;');
console.log('🧬 Filtro de grupo taxonômico adicionado ao painel de pesquisa');