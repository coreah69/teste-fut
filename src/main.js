import Chart from 'chart.js/auto';
import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Base Data
const dbLigas = [
  "Bundesliga", "DFB-Pokal", "Liga Profissional Saudita", "Liga Jupiler", 
  "Copa Da Bélgica", "Liga Profissional Argentina", "Copa Argentina", 
  "Brasil - Série A", "Brasil - Série B", "Brasil - Série C", "Brasil - Série D",
  "Copa do Brasil", "Campeonato Baiano", "Campeonato Carioca", "Campeonato Catarinense",
  "Campeonato Cearense", "Campeonato Gaúcho", "Campeonato Mineiro", "Campeonato Paulista",
  "Copa do Nordeste", "Supercopa", "La Liga", "Copa do Rei", "Ligue 1", "Copa da França",
  "Eredivisie", "Copa da Holanda", "Premier League", "Copa da Inglaterra", "Copa da Liga Inglesa",
  "Serie A", "Copa da Italia", "Primeira Liga", "Copa de Portugal", "Copa Libertadores",
  "Copa Sulamericana", "Recopa", "Copa América", "Eurocopa", "Champions League",
  "Europa League", "Conference League", "Champions League Feminina", "Mundial de Clubes",
  "Amistosos", "UEFA 2023", "Super Liga Suiça", "MLS", "Super Liga Turquia", "Allsvenskan",
  "Eliteserien", "Copa do Mundo Feminina", "Super Liga Dinamarca", "Super Liga China",
  "Copa das nações Africanas", "Supercopa da Turquia", "Premiership", "Colombia Primeira - A",
  "Liga MX - México", "Eliminatórias"
];

const dbMercados = {
  "Over Gols": [
    "+ 0.5 Gols Visitante", "+ 0.5 Gols Casa", "+ 0.5 Gols HT", "+ 0.5 Gols FT", 
    "+ 1.5 Gols", "+ 2.5 Gols", "+ 3.5 Gols", "+ 4.5 Gols", "+ 5.5 Gols", 
    "+ 6.5 Gols", "+ 7.5 Gols", "Ambas marcam"
  ],
  "Under Gols": [
    "- 0.5 Gols", "- 1.5 Gols", "- 2.5 Gols", "- 3.5 Gols", "- 4.5 Gols", 
    "- 5.5 Gols", "- 6.5 Gols", "- 7.5 Gols"
  ],
  "Over Cartões": [
    "Ambos levam cartão", "+ 0.5 Cartões", "+ 1.5 Cartões", "+ 1.5 Cartões HT", 
    "+ 1.5 Cartões FT", "+ 2.5 Cartões", "+ 3.5 Cartões", "+ 4.5 Cartões", 
    "+ 5.5 Cartões", "+ 6.5 Cartões", "+ 7.5 Cartões", "+ 8.5 Cartões", 
    "+ 9.5 Cartões", "+ 10.5 Cartões", "+ 0.5 Cartões Casa", "+ 0.5 Cartões Fora", 
    "HC + 0.5 Casa", "HC - 0.5 Fora", "Ambos 2 Cartões", "+ 1.5 Cartões Casa", 
    "+ 1.5 Cartões Fora", "+ 2.5 Cartões Casa", "+ 2.5 Cartões Fora"
  ],
  "Under Cartões": [
    "- 0.5 Cartões", "- 2.5 Cartões FT", "- 2.5 Cartões HT", "- 2.5 Cartões", 
    "- 3.5 Cartões", "- 4.5 Cartões", "- 5.5 Cartões", "- 6.5 Cartões", 
    "- 7.5 Cartões", "- 8.5 Cartões", "- 9.5 Cartões", "- 10.5 Cartões"
  ],
  "Over Escanteios": [
    "+ 2.5 Cantos HT", "+ 2.5 Cantos Casa", "+ 2.5 Cantos Fora", "+ 3.5 Cantos HT", 
    "+ 3.5 Cantos Casa", "+ 3.5 Cantos Fora", "+ 4.5 Cantos Casa", "+ 4.5 Cantos Fora", 
    "+ 4.5 Cantos HT", "+ 5.5 Cantos", "+ 6.5 Cantos", "+ 7.5 Cantos", "+ 8.5 Cantos", 
    "+ 9.5 Cantos", "+ 10.5 Cantos", "Race 3 Cantos Casa", "Race 5 Cantos Casa", 
    "Race 7 Cantos Casa", "Race 3 Cantos Fora", "Race 5 Cantos Fora", "Race 7 Cantos Fora"
  ],
  "Under Escanteios": [
    "- 1.5 Cantos", "- 2.5 Cantos", "- 3.5 Cantos", "- 4.5 Cantos", "- 5.5 Cantos", 
    "- 6.5 Cantos", "- 7.5 Cantos", "- 8.5 Cantos", "- 9.5 Cantos", "- 10.5 Cantos", 
    "- 11.5 Cantos", "- 12.5 Cantos", "- 13.5 Cantos", "- 14.5 Cantos", "- 15.5 Cantos", 
    "+ 5.5 Cantos Casa", "+ 5.5 Cantos Fora"
  ],
  "Resultado Equipe": [
    "Casa Vence", "Visitante Vence", "Empate", "Casa ou Visitante", "Casa ou Empate", 
    "Visitante ou Empate", "Empate Anula Aposta - Casa", "Empate Anula Aposta - Visitante", 
    "Casa Classifica", "Fora Classifica"
  ],
  "Handicap": [
    "Handicap 0.0 Casa", "Handicap -0.25 Casa", "Handicap -0.50 Casa", "Handicap -0.75 Casa", 
    "Handicap -1.00 Casa", "Handicap -1.25 Casa", "Handicap -1.50 Casa", "Handicap -1.75 Casa", 
    "Handicap -2.00 Casa", "Handicap -2.50 Casa", "Handicap +0.25 Casa", "Handicap +0.50 Casa", 
    "Handicap +0.75 Casa", "Handicap +1.00 Casa", "Handicap +1.25 Casa", "Handicap +1.50 Casa", 
    "Handicap +1.75 Casa", "Handicap +2.00 Casa", "Handicap +2.50 Casa", "Handicap +3.00 Casa", 
    "Handicap +3.50 Casa", "Handicap 0.0 Fora", "Handicap -0.25 Fora", "Handicap -0.50 Fora", 
    "Handicap -0.75 Fora", "Handicap -1.00 Fora", "Handicap -1.25 Fora", "Handicap -1.50 Fora", 
    "Handicap -1.75 Fora", "Handicap -2.00 Fora", "Handicap -2.50 Fora", "Handicap +0.25 Fora", 
    "Handicap +0.50 Fora", "Handicap +0.75 Fora", "Handicap +1.00 Fora", "Handicap +1.25 Fora", 
    "Handicap +1.50 Fora", "Handicap +1.75 Fora", "Handicap +2.00 Fora", "Handicap +2.50 Fora", 
    "Handicap +3.00 Fora", "Handicap +3.50 Fora"
  ],
  "Finalização": [
    "+ 0.5 Finalizações", "+ 1.5 Finalizações", "+ 2.5 Finalizações", "+ 3.5 Finalizações", 
    "+ 4.5 Finalizações", "+ 5.5 Finalizações", "+ 6.5 Finalizações", "+ 7.5 Finalizações", 
    "+ 8.5 Finalizações", "+ 9.5 Finalizações", "+ 10.5 Finalizações", "+ 11.5 Finalizações"
  ]
};

// State
let entradas = [];

// DOM Elements
const ligaSelect = document.getElementById('liga');
const mercadoSelect = document.getElementById('mercado');
const linhaSelect = document.getElementById('linha');
const entradaForm = document.getElementById('entradaForm');
const toggleFormBtn = document.getElementById('toggleFormBtn');
const formContainer = document.getElementById('formContainer');
const entradasDiaTableBody = document.querySelector('#entradasDiaTable tbody');
const historicoTableBody = document.querySelector('#historicoTable tbody');

// Charts instances
let ligaChartInstance = null;
let mercadoChartInstance = null;

// Initialize the app
async function init() {
  setupNavigation();
  populateSelects();
  setupEventListeners();
  setupCollapsibles();
  setupPredictionTabs();
  await loadData();
  
  // Load saved view or default to dashboard
  const savedView = localStorage.getItem('futAnalyze_activeView') || 'dashboard';
  showView(savedView);
  
  if (savedView === 'analise') {
    renderPredictionAnalysis();
  }
}

let activeAnalysisTab = 'global';

function setupPredictionTabs() {
  const tabs = document.querySelectorAll('.analysis-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeAnalysisTab = tab.dataset.tab;
      renderPredictionAnalysis();
    });
  });
}

function setupCollapsibles() {
  const collapsibles = document.querySelectorAll('.collapsible-card');
  collapsibles.forEach(card => {
    const header = card.querySelector('.collapsible-header');
    header.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });
}

function setDefaultDate() {
  const dateInput = document.getElementById('data');
  if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;
  }
}

// Navigation
function showView(targetId) {
  const views = document.querySelectorAll('.view');
  const navBtns = document.querySelectorAll('.nav-btn');
  
  views.forEach(view => {
    view.classList.toggle('active', view.id === targetId);
  });
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === targetId);
  });
  
  // Save active view
  localStorage.setItem('futAnalyze_activeView', targetId);
  
  if (targetId === 'dashboard') {
    updateDashboard();
  } else if (targetId === 'analise') {
    renderPredictionAnalysis();
  }
}

function setupNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showView(btn.dataset.target);
    });
  });
}

// Populate Select Options
function populateSelects() {
  // Ligas
  dbLigas.forEach(liga => {
    const option = document.createElement('option');
    option.value = liga;
    option.textContent = liga;
    ligaSelect.appendChild(option);
  });

  // Mercados
  Object.keys(dbMercados).forEach(mercado => {
    const option = document.createElement('option');
    option.value = mercado;
    option.textContent = mercado;
    mercadoSelect.appendChild(option);
  });

  // Linhas dynamic update
  mercadoSelect.addEventListener('change', (e) => {
    const mercado = e.target.value;
    linhaSelect.innerHTML = '<option value="">Selecione a linha</option>';
    
    if (mercado && dbMercados[mercado]) {
      dbMercados[mercado].forEach(linha => {
        const option = document.createElement('option');
        option.value = linha;
        option.textContent = linha;
        linhaSelect.appendChild(option);
      });
    }
  });
}

// Event Listeners
function setupEventListeners() {
  // Accordion Toggle
  if(toggleFormBtn && formContainer) {
    toggleFormBtn.addEventListener('click', () => {
      toggleFormBtn.classList.toggle('collapsed');
      formContainer.classList.toggle('collapsed');
    });
  }

  entradaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = entradaForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';

    const novaEntrada = {
      data: document.getElementById('data').value,
      liga: document.getElementById('liga').value,
      jogo: document.getElementById('jogo').value,
      mercado: document.getElementById('mercado').value,
      linha: document.getElementById('linha').value,
      resultado: document.getElementById('resultado').value,
      descricao: document.getElementById('descricao').value || null
    };

    const { data, error } = await supabase
      .from('entradas')
      .insert([novaEntrada])
      .select();

    if (error) {
      alert('Erro ao salvar no Supabase: ' + error.message);
    } else if (data) {
      entradas.push(data[0]);
      renderTables();
      // Collapse form after save
      if(toggleFormBtn && formContainer) {
        toggleFormBtn.classList.add('collapsed');
        formContainer.classList.add('collapsed');
      }
      entradaForm.reset();
      setDefaultDate();
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Salvar Entrada';
  });
}

// Data Management
async function loadData() {
  if (entradasDiaTableBody) entradasDiaTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Carregando dados...</td></tr>';
  if (historicoTableBody) historicoTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Carregando dados...</td></tr>';
  
  const { data, error } = await supabase
    .from('entradas')
    .select('*')
    .order('data', { ascending: false });

  if (error) {
    if(entradasDiaTableBody) entradasDiaTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--red);">Erro ao carregar dados: ${error.message}</td></tr>`;
    if(historicoTableBody) historicoTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--red);">Erro ao carregar dados: ${error.message}</td></tr>`;
  } else {
    entradas = data || [];
    renderTables();
    updateDashboard();
  }
}

async function deleteEntrada(id) {
  if (confirm('Deseja excluir esta entrada?')) {
    const { error } = await supabase
      .from('entradas')
      .delete()
      .eq('id', id);
    
    if (error) {
      alert('Erro ao excluir: ' + error.message);
    } else {
      entradas = entradas.filter(e => e.id !== id);
      renderTables();
      updateDashboard();
    }
  }
}

async function updateEntradaResultado(id, novoResultado) {
  const { error } = await supabase
    .from('entradas')
    .update({ resultado: novoResultado })
    .eq('id', id);
  
  if (error) {
    alert('Erro ao atualizar: ' + error.message);
    await loadData(); // Reload to revert UI change
  } else {
    // Update local state
    const index = entradas.findIndex(e => e.id === id);
    if (index !== -1) {
      entradas[index].resultado = novoResultado;
    }
    renderTables();
    updateDashboard();
  }
}

// Render UI
function createRowHtml(entrada) {
  // Format Date
  const dateObj = new Date(entrada.data + 'T00:00:00');
  const dataFormatada = dateObj.toLocaleDateString('pt-BR');
  
  // Badge class
  let badgeClass = 'badge-gray';
  if(entrada.resultado === 'Green') badgeClass = 'badge-green';
  if(entrada.resultado === 'Red') badgeClass = 'badge-red';
  if(entrada.resultado === 'Pendente') badgeClass = 'badge-pending';

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${dataFormatada}</td>
    <td>${entrada.liga}</td>
    <td>${entrada.jogo}</td>
    <td>${entrada.mercado}</td>
    <td>${entrada.linha}</td>
    <td>
      <span class="badge ${badgeClass}">
        <select class="status-select" data-id="${entrada.id}" style="color: inherit;">
          <option value="Green" ${entrada.resultado === 'Green' ? 'selected' : ''}>Green</option>
          <option value="Red" ${entrada.resultado === 'Red' ? 'selected' : ''}>Red</option>
          <option value="Reembolso" ${entrada.resultado === 'Reembolso' ? 'selected' : ''}>Reembolso</option>
          <option value="Pendente" ${entrada.resultado === 'Pendente' ? 'selected' : ''}>Pendente</option>
        </select>
      </span>
    </td>
    <td>
      <button class="delete-btn" title="Excluir"><i class="fa-solid fa-trash"></i></button>
    </td>
  `;

  // Event listener for updating status
  const selectEl = tr.querySelector('.status-select');
  selectEl.addEventListener('change', (e) => {
    // Optically update badge class instantly for better UX
    const span = e.target.parentElement;
    span.className = 'badge';
    if(e.target.value === 'Green') span.classList.add('badge-green');
    else if(e.target.value === 'Red') span.classList.add('badge-red');
    else if(e.target.value === 'Pendente') span.classList.add('badge-pending');
    else span.classList.add('badge-gray');
    
    updateEntradaResultado(entrada.id, e.target.value);
  });

  tr.querySelector('.delete-btn').addEventListener('click', () => deleteEntrada(entrada.id));
  return tr;
}

function renderTables() {
  if (entradasDiaTableBody) entradasDiaTableBody.innerHTML = '';
  if (historicoTableBody) historicoTableBody.innerHTML = '';
  
  if (entradas.length === 0) {
    if (entradasDiaTableBody) entradasDiaTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Nenhuma entrada registrada.</td></tr>';
    if (historicoTableBody) historicoTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Nenhuma entrada registrada.</td></tr>';
    return;
  }

  // Get Today's Date String in YYYY-MM-DD local format
  const todayObj = new Date();
  const year = todayObj.getFullYear();
  const month = String(todayObj.getMonth() + 1).padStart(2, '0');
  const day = String(todayObj.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const sorted = [...entradas].sort((a, b) => new Date(b.data) - new Date(a.data));

  let diaCount = 0;
  let historicoCount = 0;

  sorted.forEach(entrada => {
    const isTodayOrPending = entrada.data === todayStr || entrada.resultado === 'Pendente';
    
    // Add to 'Entradas de Hoje & Pendentes' if applicable
    if (isTodayOrPending && entradasDiaTableBody) {
      entradasDiaTableBody.appendChild(createRowHtml(entrada));
      diaCount++;
    }
    
    // Histórico Geral shows ALL entries (create a new node since DOM nodes can't be in 2 places)
    if (historicoTableBody) {
      historicoTableBody.appendChild(createRowHtml(entrada));
      historicoCount++;
    }
  });

  if (diaCount === 0 && entradasDiaTableBody) {
    entradasDiaTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Nenhuma entrada pendente ou do dia de hoje.</td></tr>';
  }
  if (historicoCount === 0 && historicoTableBody) {
    historicoTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Nenhum histórico passado encontrado.</td></tr>';
  }
}

// Dashboard Logic
function updateDashboard() {
  // KPIs (Excluding Pendente from WinRate calculations, but counting total)
  const total = entradas.length;
  const greens = entradas.filter(e => e.resultado === 'Green').length;
  const reds = entradas.filter(e => e.resultado === 'Red').length;
  const pending = entradas.filter(e => e.resultado === 'Pendente').length;
  
  let winRate = 0;
  const completedBets = greens + reds;
  if (completedBets > 0) {
    winRate = Math.round((greens / completedBets) * 100);
  }

  document.getElementById('kpiTotal').textContent = total;
  document.getElementById('kpiGreen').textContent = greens;
  document.getElementById('kpiRed').textContent = reds;
  document.getElementById('kpiWinRate').textContent = `${winRate}%`;

  renderCharts();
}

function renderCharts() {
  // Data for League Chart (Greens vs Reds per League)
  const ligaData = {};
  entradas.forEach(e => {
    if (!ligaData[e.liga]) ligaData[e.liga] = { green: 0, red: 0 };
    if (e.resultado === 'Green') ligaData[e.liga].green++;
    if (e.resultado === 'Red') ligaData[e.liga].red++;
  });

  const ligaLabels = Object.keys(ligaData);
  const ligaGreens = ligaLabels.map(l => ligaData[l].green);
  const ligaReds = ligaLabels.map(l => ligaData[l].red);

  if (ligaChartInstance) ligaChartInstance.destroy();
  const ctxLiga = document.getElementById('ligaChart').getContext('2d');
  ligaChartInstance = new Chart(ctxLiga, {
    type: 'bar',
    data: {
      labels: ligaLabels,
      datasets: [
        { label: 'Greens', data: ligaGreens, backgroundColor: '#10b981' },
        { label: 'Reds', data: ligaReds, backgroundColor: '#ef4444' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#f8fafc' } }
      },
      scales: {
        y: { ticks: { color: '#94a3b8', stepSize: 1 }, grid: { color: '#334155' } },
        x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
      }
    }
  });

  // Data for Market Chart (Win Rate per Market)
  const mercadoData = {};
  entradas.forEach(e => {
    if (!mercadoData[e.mercado]) mercadoData[e.mercado] = { green: 0, total: 0 };
    if (e.resultado === 'Green' || e.resultado === 'Red') {
      mercadoData[e.mercado].total++;
      if (e.resultado === 'Green') mercadoData[e.mercado].green++;
    }
  });

  const mercadoLabels = Object.keys(mercadoData).filter(m => mercadoData[m].total > 0);
  const mercadoWinRates = mercadoLabels.map(m => Math.round((mercadoData[m].green / mercadoData[m].total) * 100));

  if (mercadoChartInstance) mercadoChartInstance.destroy();
  const ctxMercado = document.getElementById('mercadoChart').getContext('2d');
  mercadoChartInstance = new Chart(ctxMercado, {
    type: 'doughnut',
    data: {
      labels: mercadoLabels,
      datasets: [{
        data: mercadoWinRates,
        backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1', '#14b8a6', '#ef4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { color: '#f8fafc' } },
        tooltip: { callbacks: { label: (context) => ` ${context.label}: ${context.raw}% Win Rate` } }
      }
    }
  });
}

// Analysis State
let analysisData = JSON.parse(localStorage.getItem('futAnalyze_analysis')) || {
  timeCasa: 'Real Madrid',
  timeFora: 'Alavés',
  gamesCasa: [
    { teamA: 'Real Madrid', teamB: 'Espanyol', scoreCasa: '4', scoreFora: '1', result: 'V', shotsCasa: '18', shotsFora: '8', shotsOnGoalCasa: '8', shotsOnGoalFora: '3', cornersCasa: '7', cornersFora: '3', yellowCardsCasa: '2', yellowCardsFora: '3' },
    { teamA: 'Real Madrid', teamB: 'Stuttgart', scoreCasa: '3', scoreFora: '1', result: 'V', shotsCasa: '15', shotsFora: '10', shotsOnGoalCasa: '7', shotsOnGoalFora: '4', cornersCasa: '6', cornersFora: '4', yellowCardsCasa: '1', yellowCardsFora: '2' },
    { teamA: 'Real Madrid', teamB: 'Sociedad', scoreCasa: '2', scoreFora: '0', result: 'V', shotsCasa: '12', shotsFora: '11', shotsOnGoalCasa: '6', shotsOnGoalFora: '5', cornersCasa: '5', cornersFora: '5', yellowCardsCasa: '2', yellowCardsFora: '1' },
    { teamA: 'Real Madrid', teamB: 'Betis', scoreCasa: '2', scoreFora: '0', result: 'V', shotsCasa: '14', shotsFora: '9', shotsOnGoalCasa: '7', shotsOnGoalFora: '2', cornersCasa: '8', cornersFora: '2', yellowCardsCasa: '3', yellowCardsFora: '2' },
    { teamA: 'Las Palmas', teamB: 'Real Madrid', scoreCasa: '1', scoreFora: '1', result: 'E', shotsCasa: '8', shotsFora: '19', shotsOnGoalCasa: '3', shotsOnGoalFora: '8', cornersCasa: '2', cornersFora: '9', yellowCardsCasa: '2', yellowCardsFora: '1' }
  ],
  gamesFora: [
    { teamA: 'Alavés', teamB: 'Sevilla', scoreCasa: '2', scoreFora: '1', result: 'V', shotsCasa: '12', shotsFora: '9', shotsOnGoalCasa: '5', shotsOnGoalFora: '3', cornersCasa: '4', cornersFora: '6', yellowCardsCasa: '4', yellowCardsFora: '3' },
    { teamA: 'Espanyol', teamB: 'Alavés', scoreCasa: '3', scoreFora: '2', result: 'D', shotsCasa: '14', shotsFora: '10', shotsOnGoalCasa: '6', shotsOnGoalFora: '4', cornersCasa: '5', cornersFora: '4', yellowCardsCasa: '2', yellowCardsFora: '5' },
    { teamA: 'Alavés', teamB: 'Las Palmas', scoreCasa: '2', scoreFora: '0', result: 'V', shotsCasa: '10', shotsFora: '8', shotsOnGoalCasa: '4', shotsOnGoalFora: '2', cornersCasa: '3', cornersFora: '5', yellowCardsCasa: '1', yellowCardsFora: '2' },
    { teamA: 'Sociedad', teamB: 'Alavés', scoreCasa: '1', scoreFora: '2', result: 'V', shotsCasa: '13', shotsFora: '8', shotsOnGoalCasa: '4', shotsOnGoalFora: '3', cornersCasa: '6', cornersFora: '2', yellowCardsCasa: '3', yellowCardsFora: '4' },
    { teamA: 'Alavés', teamB: 'Betis', scoreCasa: '0', scoreFora: '0', result: 'E', shotsCasa: '7', shotsFora: '11', shotsOnGoalCasa: '2', shotsOnGoalFora: '3', cornersCasa: '2', cornersFora: '7', yellowCardsCasa: '2', yellowCardsFora: '2' }
  ]
};

function saveAnalysis() {
  localStorage.setItem('futAnalyze_analysis', JSON.stringify(analysisData));
}

function setupAnalysis() {
  const timeCasaInput = document.getElementById('timeCasaAnalise');
  const timeForaInput = document.getElementById('timeForaAnalise');
  const displayTimeCasa = document.getElementById('displayTimeCasa');
  const displayTimeFora = document.getElementById('displayTimeFora');

  if (timeCasaInput) {
    timeCasaInput.value = analysisData.timeCasa;
    displayTimeCasa.textContent = analysisData.timeCasa || 'Time Casa';
    timeCasaInput.addEventListener('input', (e) => {
      analysisData.timeCasa = e.target.value;
      displayTimeCasa.textContent = e.target.value || 'Time Casa';
      saveAnalysis();
      renderPredictionAnalysis();
    });
  }

  if (timeForaInput) {
    timeForaInput.value = analysisData.timeFora;
    displayTimeFora.textContent = analysisData.timeFora || 'Time Visitante';
    timeForaInput.addEventListener('input', (e) => {
      analysisData.timeFora = e.target.value;
      displayTimeFora.textContent = e.target.value || 'Time Visitante';
      saveAnalysis();
      renderPredictionAnalysis();
    });
  }

  renderAnalysisGames();
  renderPredictionAnalysis();
}

function renderAnalysisGames() {
  const listaCasa = document.getElementById('listaJogosCasa');
  const listaFora = document.getElementById('listaJogosFora');

  if (!listaCasa || !listaFora) return;

  listaCasa.innerHTML = '';
  listaFora.innerHTML = '';

  analysisData.gamesCasa.forEach((game, index) => {
    listaCasa.appendChild(createGameAccordion('casa', index, game));
  });

  analysisData.gamesFora.forEach((game, index) => {
    listaFora.appendChild(createGameAccordion('fora', index, game));
  });
}

function createGameAccordion(team, index, gameData) {
  const container = document.createElement('div');
  
  let resultClass = '';
  if (gameData) {
    if (gameData.result === 'V') resultClass = 'win';
    else if (gameData.result === 'D') resultClass = 'loss';
    else if (gameData.result === 'E') resultClass = 'draw';
  }
  
  container.className = `game-accordion ${resultClass}`;
  
  let matchup = 'Pendente';
  if (gameData) {
    const scoreA = gameData.scoreCasa !== '' ? gameData.scoreCasa : '?';
    const scoreB = gameData.scoreFora !== '' ? gameData.scoreFora : '?';
    matchup = `${gameData.teamA} ${scoreA} x ${scoreB} ${gameData.teamB}`;
  }
  
  let status = 'Pendente';
  if (gameData) {
    if (gameData.result === 'V') status = 'VITÓRIA';
    else if (gameData.result === 'D') status = 'DERROTA';
    else if (gameData.result === 'E') status = 'EMPATE';
  }

  const teamNameDefault = team === 'casa' ? (analysisData.timeCasa || 'Time A') : (analysisData.timeFora || 'Time A');
  const tA = gameData ? gameData.teamA : teamNameDefault;
  const tB = gameData ? gameData.teamB : '';

  container.innerHTML = `
    <div class="game-accordion-header">
      <div class="game-info-wrapper">
        <span class="game-number">Jogo ${index + 1}</span>
        <span class="game-matchup">${matchup}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 15px;">
        <span class="game-status">${status}</span>
        <i class="fas fa-chevron-down accordion-arrow"></i>
      </div>
    </div>
    <div class="game-accordion-content">
      <div class="score-input-container">
        <div class="team-score-group">
          <input type="text" class="modal-team-input tA" value="${tA}" placeholder="Time A">
          <input type="number" class="score-input sC" value="${gameData ? gameData.scoreCasa : ''}" placeholder="0">
        </div>
        <div class="score-separator">X</div>
        <div class="team-score-group">
          <input type="text" class="modal-team-input tB" value="${tB}" placeholder="Time B">
          <input type="number" class="score-input sF" value="${gameData ? gameData.scoreFora : ''}" placeholder="0">
        </div>
      </div>

      <div class="stats-comparison-table">
        <div class="stats-header-row">
          <div class="metric-label">Métrica</div>
          <div>Casa</div>
          <div>Fora</div>
        </div>
        
        ${renderStatRow('Chutes', 'shots', gameData)}
        ${renderStatRow('Chutes ao Gol', 'shotsOnGoal', gameData)}
        ${renderStatRow('Cantos', 'corners', gameData)}
        ${renderStatRow('Card Amarelo', 'yellowCards', gameData)}
        ${renderStatRow('Card Vermelho', 'redCards', gameData)}
        ${renderStatRow('Faltas', 'fouls', gameData)}
        ${renderStatRow('Impedimentos', 'offsides', gameData)}
      </div>

      <button class="accordion-save-btn">SALVAR DADOS</button>
    </div>
  `;

  const header = container.querySelector('.game-accordion-header');
  header.addEventListener('click', () => {
    container.classList.toggle('active');
  });

  const saveBtn = container.querySelector('.accordion-save-btn');
  saveBtn.addEventListener('click', () => {
    const newData = {
      teamA: container.querySelector('.tA').value,
      teamB: container.querySelector('.tB').value,
      scoreCasa: container.querySelector('.sC').value,
      scoreFora: container.querySelector('.sF').value,
      shotsCasa: container.querySelector('.shots-casa').value,
      shotsFora: container.querySelector('.shots-fora').value,
      shotsOnGoalCasa: container.querySelector('.shotsOnGoal-casa').value,
      shotsOnGoalFora: container.querySelector('.shotsOnGoal-fora').value,
      cornersCasa: container.querySelector('.corners-casa').value,
      cornersFora: container.querySelector('.corners-fora').value,
      yellowCardsCasa: container.querySelector('.yellowCards-casa').value,
      yellowCardsFora: container.querySelector('.yellowCards-fora').value,
      redCardsCasa: container.querySelector('.redCards-casa').value,
      redCardsFora: container.querySelector('.redCards-fora').value,
      foulsCasa: container.querySelector('.fouls-casa').value,
      foulsFora: container.querySelector('.fouls-fora').value,
      offsidesCasa: container.querySelector('.offsides-casa').value,
      offsidesFora: container.querySelector('.offsides-fora').value
    };

    // Calculate result
    let result = 'E';
    const sc = parseInt(newData.scoreCasa) || 0;
    const sf = parseInt(newData.scoreFora) || 0;
    
    const mainTeam = team === 'casa' ? 
      document.getElementById('timeCasaAnalise').value.trim().toUpperCase() : 
      document.getElementById('timeForaAnalise').value.trim().toUpperCase();
    
    const tAName = newData.teamA.trim().toUpperCase();
    const tBName = newData.teamB.trim().toUpperCase();

    if (tAName === mainTeam) {
      if (sc > sf) result = 'V'; else if (sc < sf) result = 'D';
    } else if (tBName === mainTeam) {
      if (sf > sc) result = 'V'; else if (sf < sc) result = 'D';
    } else {
      if (sc > sf) result = 'V'; else if (sc < sf) result = 'D';
    }
    
    newData.result = result;
    newData.opponent = `${newData.teamA} x ${newData.teamB}`;

    if (team === 'casa') analysisData.gamesCasa[index] = newData;
    else analysisData.gamesFora[index] = newData;

    saveAnalysis();
    renderAnalysisGames();
    renderPredictionAnalysis(); // New
    showNotification('Dados salvos com sucesso!');
  });

  return container;
}

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toUpperCase();
}

function calculateAverages(games, isHomeTeam) {
  const count = games.filter(g => g !== null).length;
  if (count === 0) return null;

  const inputId = isHomeTeam ? 'timeCasaAnalise' : 'timeForaAnalise';
  const inputEl = document.getElementById(inputId);
  const mainTeam = normalizeString(inputEl ? inputEl.value : (isHomeTeam ? analysisData.timeCasa : analysisData.timeFora));

  const total = {
    scored: 0,
    conceded: 0,
    matchTotalGoals: 0,
    teamShots: 0,
    matchShots: 0,
    teamCorners: 0,
    matchCorners: 0,
    teamCards: 0,
    matchCards: 0,
    teamFouls: 0,
    matchFouls: 0,
    teamOffsides: 0,
    matchOffsides: 0,
    btts: 0,
    cleanSheets: 0,
    failedToScore: 0,
    results: [],
    over: {
      g05: 0, g15: 0, g25: 0, g35: 0,
      c75: 0, c85: 0, c95: 0, c105: 0,
      ca35: 0, ca45: 0, ca55: 0
    }
  };

  games.forEach(g => {
    if (!g) return;
    const sc = parseInt(g.scoreCasa) || 0;
    const sf = parseInt(g.scoreFora) || 0;
    const cc = parseInt(g.cornersCasa) || 0;
    const cf = parseInt(g.cornersFora) || 0;
    const flc = parseInt(g.foulsCasa) || 0;
    const flf = parseInt(g.foulsFora) || 0;
    const offc = parseInt(g.offsidesCasa) || 0;
    const offf = parseInt(g.offsidesFora) || 0;
    const yc = (parseInt(g.yellowCardsCasa) || 0) + (parseInt(g.redCardsCasa) || 0);
    const yf = (parseInt(g.yellowCardsFora) || 0) + (parseInt(g.redCardsFora) || 0);

    const tAName = normalizeString(g.teamA);
    const tBName = normalizeString(g.teamB);

    let teamGoals = 0;
    let opponentGoals = 0;
    let teamCorners = 0;
    let teamCards = 0;
    let teamFouls = 0;
    let teamOffsides = 0;

    const tShotsCasa = parseInt(g.shotsCasa) || 0;
    const tShotsFora = parseInt(g.shotsFora) || 0;
    let teamShots = 0;

    if (tAName === mainTeam) {
      teamGoals = sc; opponentGoals = sf; teamCorners = cc; teamCards = yc; teamFouls = flc; teamOffsides = offc; teamShots = tShotsCasa;
    } else if (tBName === mainTeam) {
      teamGoals = sf; opponentGoals = sc; teamCorners = cf; teamCards = yf; teamFouls = flf; teamOffsides = offf; teamShots = tShotsFora;
    } else {
      teamGoals = sc; opponentGoals = sf; teamCorners = cc; teamCards = yc; teamFouls = flc; teamOffsides = offc; teamShots = tShotsCasa;
    }

    total.scored += teamGoals;
    total.conceded += opponentGoals;
    total.matchTotalGoals += (sc + sf);
    
    total.teamShots += teamShots;
    total.matchShots += (tShotsCasa + tShotsFora);
    
    total.teamCorners += teamCorners;
    total.matchCorners += (cc + cf);
    
    total.teamCards += teamCards;
    total.matchCards += (yc + yf);
    
    total.teamFouls += teamFouls;
    total.matchFouls += (flc + flf);
    
    total.teamOffsides += teamOffsides;
    total.matchOffsides += (offc + offf);

    if (sc > 0 && sf > 0) total.btts++;
    if (opponentGoals === 0) total.cleanSheets++;
    if (teamGoals === 0) total.failedToScore++;

    // Results Form
    if (teamGoals > opponentGoals) total.results.push('V');
    else if (teamGoals < opponentGoals) total.results.push('D');
    else total.results.push('E');

    // Over Probabilities
    const matchGoals = sc + sf;
    if (matchGoals > 0.5) total.over.g05++;
    if (matchGoals > 1.5) total.over.g15++;
    if (matchGoals > 2.5) total.over.g25++;
    if (matchGoals > 3.5) total.over.g35++;

    const matchCorners = cc + cf;
    if (matchCorners > 7.5) total.over.c75++;
    if (matchCorners > 8.5) total.over.c85++;
    if (matchCorners > 9.5) total.over.c95++;
    if (matchCorners > 10.5) total.over.c105++;

    const matchCards = yc + yf;
    if (matchCards > 3.5) total.over.ca35++;
    if (matchCards > 4.5) total.over.ca45++;
    if (matchCards > 5.5) total.over.ca55++;
  });

  return {
    scoredAvg: (total.scored / count).toFixed(2),
    concededAvg: (total.conceded / count).toFixed(2),
    goalsAvg: (total.matchTotalGoals / count).toFixed(2),
    
    teamShotsAvg: (total.teamShots / count).toFixed(2),
    matchShotsAvg: (total.matchShots / count).toFixed(2),
    
    teamCornersAvg: (total.teamCorners / count).toFixed(2),
    matchCornersAvg: (total.matchCorners / count).toFixed(2),
    
    teamCardsAvg: (total.teamCards / count).toFixed(2),
    matchCardsAvg: (total.matchCards / count).toFixed(2),
    
    teamFoulsAvg: (total.teamFouls / count).toFixed(2),
    matchFoulsAvg: (total.matchFouls / count).toFixed(2),
    
    teamOffsidesAvg: (total.teamOffsides / count).toFixed(2),
    matchOffsidesAvg: (total.matchOffsides / count).toFixed(2),
    
    bttsPerc: ((total.btts / count) * 100).toFixed(0),
    cleanSheetsPerc: ((total.cleanSheets / count) * 100).toFixed(0),
    failedToScorePerc: ((total.failedToScore / count) * 100).toFixed(0),
    results: total.results,
    over: {
      g05: ((total.over.g05 / count) * 100).toFixed(0),
      g15: ((total.over.g15 / count) * 100).toFixed(0),
      g25: ((total.over.g25 / count) * 100).toFixed(0),
      g35: ((total.over.g35 / count) * 100).toFixed(0),
      c75: ((total.over.c75 / count) * 100).toFixed(0),
      c85: ((total.over.c85 / count) * 100).toFixed(0),
      c95: ((total.over.c95 / count) * 100).toFixed(0),
      c105: ((total.over.c105 / count) * 100).toFixed(0),
      ca35: ((total.over.ca35 / count) * 100).toFixed(0),
      ca45: ((total.over.ca45 / count) * 100).toFixed(0),
      ca55: ((total.over.ca55 / count) * 100).toFixed(0)
    },
    count
  };
}

function renderPredictionAnalysis() {
  const output = document.getElementById('predictionOutput');
  if (!output) return;

  const avgCasa = calculateAverages(analysisData.gamesCasa, true);
  const avgFora = calculateAverages(analysisData.gamesFora, false);

  if (!avgCasa || !avgFora) {
    output.innerHTML = `
      <div class="prediction-empty-state">
        <i class="fas fa-calculator"></i>
        <p>Preencha os dados dos últimos 5 jogos de ambos os times para gerar a análise.</p>
      </div>
    `;
    return;
  }

  const teamCasa = analysisData.timeCasa || 'Time Casa';
  const teamFora = analysisData.timeFora || 'Time Visitante';

  // Render Layout
  output.innerHTML = `
    <div class="prediction-body">
      <div class="main-stats-column">
        <!-- Match Header -->
        <div class="match-header-compact">
          <div class="team-box">
            <div class="team-logo-placeholder"><i class="fas fa-shield-alt"></i></div>
            <span class="team-name-big">${teamCasa}</span>
            <div class="form-badges">${avgCasa.results.map(r => `<span class="badge ${r.toLowerCase()}">${r}</span>`).join('')}</div>
          </div>
          <div class="match-vs">
            <span class="vs-text">VS</span>
          </div>
          <div class="team-box">
            <div class="team-logo-placeholder"><i class="fas fa-shield-alt"></i></div>
            <span class="team-name-big">${teamFora}</span>
            <div class="form-badges">${avgFora.results.map(r => `<span class="badge ${r.toLowerCase()}">${r}</span>`).join('')}</div>
          </div>
        </div>

        <div class="tabs-content-wrapper">
          ${renderTabContent(activeAnalysisTab, avgCasa, avgFora, teamCasa, teamFora)}
        </div>
      </div>

      <div class="detailed-analysis-sidebar">
        ${renderSidebarDynamic(activeAnalysisTab, avgCasa, avgFora)}
        
        <h4 class="sidebar-section-title" style="margin-top: 20px;">Vantagem de Confronto</h4>
        ${renderDirectComparisonBar(activeAnalysisTab, avgCasa, avgFora)}
      </div>
    </div>
  `;
}

function renderSidebarDynamic(tab, avgCasa, avgFora) {
  let title = "Análise Detalhada";
  let content = "";

  if (tab === 'global' || tab === 'golos') {
    title = "Análise de Golos";
    content = `
      ${renderSidebarRow('Média Gols Marcados', avgCasa.scoredAvg, avgFora.scoredAvg)}
      ${renderSidebarRow('Média Gols Sofridos', avgCasa.concededAvg, avgFora.concededAvg)}
      ${renderSidebarRow('Média Gols (Total)', avgCasa.goalsAvg, avgFora.goalsAvg)}
      ${renderSidebarRow('BTTS %', avgCasa.bttsPerc + '%', avgFora.bttsPerc + '%')}
      ${renderSidebarRow('Finalizações', avgCasa.teamShotsAvg, avgFora.teamShotsAvg)}
    `;
  } else if (tab === 'cantos') {
    title = "Análise de Cantos";
    content = `
      ${renderSidebarRow('Média Cantos Equipa', avgCasa.teamCornersAvg, avgFora.teamCornersAvg)}
      ${renderSidebarRow('Média Cantos (Total)', avgCasa.matchCornersAvg, avgFora.matchCornersAvg)}
      ${renderSidebarRow('Over 8.5 %', avgCasa.over.c85 + '%', avgFora.over.c85 + '%')}
      ${renderSidebarRow('Over 10.5 %', avgCasa.over.c105 + '%', avgFora.over.c105 + '%')}
    `;
  } else if (tab === 'cartoes') {
    title = "Análise de Cartões";
    content = `
      ${renderSidebarRow('Média Cartões Equipa', avgCasa.teamCardsAvg, avgFora.teamCardsAvg)}
      ${renderSidebarRow('Média Faltas Equipa', avgCasa.teamFoulsAvg, avgFora.teamFoulsAvg)}
      ${renderSidebarRow('Média Impedimentos', avgCasa.teamOffsidesAvg, avgFora.teamOffsidesAvg)}
      ${renderSidebarRow('Over 4.5 %', avgCasa.over.ca45 + '%', avgFora.over.ca45 + '%')}
    `;
  } else if (tab === 'finalizacoes') {
    title = "Análise de Remates";
    content = `
      ${renderSidebarRow('Média Chutes', avgCasa.teamShotsAvg, avgFora.teamShotsAvg)}
      ${renderSidebarRow('Média Golos', avgCasa.scoredAvg, avgFora.scoredAvg)}
      ${renderSidebarRow('Eficiência %', ((parseFloat(avgCasa.scoredAvg) / (parseFloat(avgCasa.teamShotsAvg) || 1)) * 100).toFixed(1) + '%', ((parseFloat(avgFora.scoredAvg) / (parseFloat(avgFora.teamShotsAvg) || 1)) * 100).toFixed(1) + '%')}
    `;
  } else if (tab === 'faltas') {
    title = "Análise de Faltas";
    content = `
      ${renderSidebarRow('Média Faltas Equipa', avgCasa.teamFoulsAvg, avgFora.teamFoulsAvg)}
      ${renderSidebarRow('Cartões/Falta', (parseFloat(avgCasa.teamCardsAvg) / (parseFloat(avgCasa.teamFoulsAvg) || 1)).toFixed(2), (parseFloat(avgFora.teamCardsAvg) / (parseFloat(avgFora.teamFoulsAvg) || 1)).toFixed(2))}
    `;
  } else if (tab === 'impedimentos') {
    title = "Análise de Impedimentos";
    content = `
      ${renderSidebarRow('Média Impedimentos', avgCasa.teamOffsidesAvg, avgFora.teamOffsidesAvg)}
    `;
  }

  return `
    <h4 class="sidebar-section-title">${title}</h4>
    <div class="sidebar-stats-list">
      ${content}
    </div>
  `;
}

function renderTabContent(tab, avgCasa, avgFora, tCasa, tFora) {
  if (tab === 'global') {
    return `
      <div class="prediction-table-container">
        <table class="prediction-table">
          <thead>
            <tr>
              <th>Mercado Global</th>
              <th>${tCasa}</th>
              <th>${tFora}</th>
              <th>Jogo</th>
            </tr>
          </thead>
          <tbody>
            ${renderProbRow('Over 0.5 Gols', avgCasa.over.g05, avgFora.over.g05)}
            ${renderProbRow('Over 1.5 Gols', avgCasa.over.g15, avgFora.over.g15)}
            ${renderProbRow('Over 2.5 Gols', avgCasa.over.g25, avgFora.over.g25)}
            ${renderProbRow('Ambas Marcam', avgCasa.bttsPerc, avgFora.bttsPerc)}
            <tr>
              <td>Média Finalizações</td>
              <td><span class="prob-val prob-mid">${avgCasa.teamShotsAvg}</span></td>
              <td><span class="prob-val prob-mid">${avgFora.teamShotsAvg}</span></td>
              <td><span class="prob-val prob-mid">${((parseFloat(avgCasa.teamShotsAvg) + parseFloat(avgFora.teamShotsAvg))).toFixed(1)}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  } else if (tab === 'golos') {
    return `
      <div class="prediction-table-container">
        <table class="prediction-table">
          <thead>
            <tr>
              <th>Análise de Golos</th>
              <th>${tCasa}</th>
              <th>${tFora}</th>
              <th>Jogo</th>
            </tr>
          </thead>
          <tbody>
            ${renderProbRow('Over 0.5 FT', avgCasa.over.g05, avgFora.over.g05)}
            ${renderProbRow('Over 1.5 FT', avgCasa.over.g15, avgFora.over.g15)}
            ${renderProbRow('Over 2.5 FT', avgCasa.over.g25, avgFora.over.g25)}
            ${renderProbRow('Over 3.5 FT', avgCasa.over.g35, avgFora.over.g35)}
          </tbody>
        </table>
      </div>
    `;
  } else if (tab === 'cantos') {
    return `
      <div class="prediction-table-container">
        <table class="prediction-table">
          <thead>
            <tr>
              <th>Análise de Cantos</th>
              <th>${tCasa}</th>
              <th>${tFora}</th>
              <th>Jogo</th>
            </tr>
          </thead>
          <tbody>
            ${renderProbRow('Over 7.5 Cantos', avgCasa.over.c75, avgFora.over.c75)}
            ${renderProbRow('Over 8.5 Cantos', avgCasa.over.c85, avgFora.over.c85)}
            ${renderProbRow('Over 9.5 Cantos', avgCasa.over.c95, avgFora.over.c95)}
            ${renderProbRow('Over 10.5 Cantos', avgCasa.over.c105, avgFora.over.c105)}
            ${renderComparisonRowRaw('Média Cantos', avgCasa.teamCornersAvg, avgFora.teamCornersAvg)}
          </tbody>
        </table>
      </div>
    `;
  } else if (tab === 'cartoes') {
    return `
      <div class="prediction-table-container">
        <table class="prediction-table">
          <thead>
            <tr>
              <th>Análise de Cartões</th>
              <th>${tCasa}</th>
              <th>${tFora}</th>
              <th>Jogo</th>
            </tr>
          </thead>
          <tbody>
            ${renderProbRow('Over 3.5 Cartões', avgCasa.over.ca35, avgFora.over.ca35)}
            ${renderProbRow('Over 4.5 Cartões', avgCasa.over.ca45, avgFora.over.ca45)}
            ${renderProbRow('Over 5.5 Cartões', avgCasa.over.ca55, avgFora.over.ca55)}
            ${renderComparisonRowRaw('Média Cartões', avgCasa.teamCardsAvg, avgFora.teamCardsAvg)}
          </tbody>
        </table>
      </div>
    `;
  } else if (tab === 'finalizacoes') {
    return `
      <div class="prediction-table-container">
        <table class="prediction-table">
          <thead>
            <tr>
              <th>Análise de Finalizações</th>
              <th>${tCasa}</th>
              <th>${tFora}</th>
              <th>Jogo</th>
            </tr>
          </thead>
          <tbody>
            ${renderComparisonRowRaw('Média Chutes', avgCasa.teamShotsAvg, avgFora.teamShotsAvg)}
            ${renderComparisonRowRaw('Média Golos', avgCasa.scoredAvg, avgFora.scoredAvg)}
            ${renderComparisonRowRaw('Conversão %', ((parseFloat(avgCasa.scoredAvg) / (parseFloat(avgCasa.teamShotsAvg) || 1)) * 100).toFixed(1) + '%', ((parseFloat(avgFora.scoredAvg) / (parseFloat(avgFora.teamShotsAvg) || 1)) * 100).toFixed(1) + '%')}
          </tbody>
        </table>
      </div>
    `;
  } else if (tab === 'faltas') {
    return `
      <div class="prediction-table-container">
        <table class="prediction-table">
          <thead>
            <tr>
              <th>Análise de Faltas</th>
              <th>${tCasa}</th>
              <th>${tFora}</th>
              <th>Jogo</th>
            </tr>
          </thead>
          <tbody>
            ${renderComparisonRowRaw('Média Faltas', avgCasa.teamFoulsAvg, avgFora.teamFoulsAvg)}
            ${renderComparisonRowRaw('Cartões Proporção', (parseFloat(avgCasa.teamCardsAvg) / (parseFloat(avgCasa.teamFoulsAvg) || 1)).toFixed(2), (parseFloat(avgFora.teamCardsAvg) / (parseFloat(avgFora.teamFoulsAvg) || 1)).toFixed(2))}
          </tbody>
        </table>
      </div>
    `;
  } else if (tab === 'impedimentos') {
    return `
      <div class="prediction-table-container">
        <table class="prediction-table">
          <thead>
            <tr>
              <th>Análise de Impedimentos</th>
              <th>${tCasa}</th>
              <th>${tFora}</th>
              <th>Jogo</th>
            </tr>
          </thead>
          <tbody>
            ${renderComparisonRowRaw('Média Impedimentos', avgCasa.teamOffsidesAvg, avgFora.teamOffsidesAvg)}
          </tbody>
        </table>
      </div>
    `;
  }
}

function renderComparisonRowRaw(label, valCasa, valFora) {
  const vC = parseFloat(valCasa);
  const vF = parseFloat(valFora);
  return `
    <tr>
      <td>${label}</td>
      <td><span class="prob-val prob-mid">${valCasa}</span></td>
      <td><span class="prob-val prob-mid">${valFora}</span></td>
      <td><span class="prob-val prob-mid">${(vC + vF).toFixed(1)}</span></td>
    </tr>
  `;
}

function renderProbRow(label, valCasa, valFora) {
  const vC = parseInt(valCasa);
  const vF = parseInt(valFora);
  const vJ = ((vC + vF) / 2).toFixed(0);
  
  const getProbClass = (v) => {
    if (v >= 75) return 'prob-high';
    if (v >= 50) return 'prob-mid';
    return 'prob-low';
  };

  return `
    <tr>
      <td>${label}</td>
      <td><span class="prob-val ${getProbClass(vC)}">${vC}%</span></td>
      <td><span class="prob-val ${getProbClass(vF)}">${vF}%</span></td>
      <td><span class="prob-val ${getProbClass(vJ)}">${vJ}%</span></td>
    </tr>
  `;
}

function renderSidebarRow(label, valCasa, valFora) {
  return `
    <div class="stats-row-split">
      <div class="split-val home">${valCasa}</div>
      <div class="split-label">${label}</div>
      <div class="split-val away">${valFora}</div>
    </div>
  `;
}

function renderDirectComparisonBar(tab, avgCasa, avgFora) {
  let sC = 0, sF = 0;

  if (tab === 'global' || tab === 'golos') {
    sC = (parseFloat(avgCasa.scoredAvg) * 1.5 + parseFloat(avgCasa.shotsAvg) * 0.1);
    sF = (parseFloat(avgFora.scoredAvg) * 1.5 + parseFloat(avgFora.shotsAvg) * 0.1);
  } else if (tab === 'cantos') {
    sC = parseFloat(avgCasa.cornersAvg);
    sF = parseFloat(avgFora.cornersAvg);
  } else if (tab === 'finalizacoes') {
    sC = parseFloat(avgCasa.shotsAvg);
    sF = parseFloat(avgFora.shotsAvg);
  } else if (tab === 'faltas') {
    sC = parseFloat(avgCasa.foulsAvg);
    sF = parseFloat(avgFora.foulsAvg);
  } else if (tab === 'impedimentos') {
    sC = parseFloat(avgCasa.offsidesAvg);
    sF = parseFloat(avgFora.offsidesAvg);
  }
  
  const total = sC + sF;
  const pC = total > 0 ? ((sC / total) * 100).toFixed(0) : 33;
  const pF = total > 0 ? ((sF / total) * 100).toFixed(0) : 33;
  const pE = (100 - pC - pF);

  return `
    <div class="direct-comp-bar">
      <div class="comp-part v" style="width: ${pC}%">${pC}%</div>
      <div class="comp-part e" style="width: ${pE}%">${pE}%</div>
      <div class="comp-part d" style="width: ${pF}%">${pF}%</div>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8; font-weight: 700;">
      <span>VITÓRIA CASA</span>
      <span>EMPATE</span>
      <span>VITÓRIA FORA</span>
    </div>
  `;
}

function renderComparisonRow(label, valCasa, valFora) {
  const vC = parseFloat(valCasa);
  const vF = parseFloat(valFora);
  const total = vC + vF;
  const percCasa = total > 0 ? (vC / total) * 100 : 50;
  const percFora = total > 0 ? (vF / total) * 100 : 50;

  return `
    <div class="comparison-row">
      <div class="comparison-label">${label}</div>
      <div class="comparison-bar-wrapper">
        <div class="comp-val home">${valCasa}</div>
        <div class="comp-bar-bg">
          <div class="comp-bar-fill comp-bar-home" style="width: ${percCasa}%"></div>
          <div class="comp-bar-fill comp-bar-away" style="width: ${percFora}%"></div>
        </div>
        <div class="comp-val away">${valFora}</div>
      </div>
    </div>
  `;
}


function renderStatRow(label, key, gameData) {
  const valCasa = gameData ? gameData[`${key}Casa`] : '';
  const valFora = gameData ? gameData[`${key}Fora`] : '';
  
  return `
    <div class="stats-row">
      <div class="metric-label">${label}</div>
      <input type="number" class="${key}-casa" value="${valCasa}" placeholder="0">
      <input type="number" class="${key}-fora" value="${valFora}" placeholder="0">
    </div>
  `;
}

// Run
init();
setupAnalysis();
