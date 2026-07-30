// ===============================
// RELÓGIO EM TEMPO REAL
// ===============================
function atualizarRelogio() {
  const agora = new Date();

  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  const dia = String(agora.getDate()).padStart(2, "0");
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const ano = agora.getFullYear();

  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  ];

  document.getElementById("current-time").textContent = `${horas}:${minutos}:${segundos}`;
  document.getElementById("main-clock").textContent = `${horas}:${minutos}:${segundos}`;
  document.getElementById("main-date").textContent = `${dia}/${mes}/${ano}`;
  document.getElementById("main-weekday").textContent = diasSemana[agora.getDay()];
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();


// ===============================
// LISTA DE REGISTROS
// ===============================
const logs = [];
const logsList = document.getElementById("logs-list");

// Último tipo registrado (para alternar)
let ultimoTipo = "Saída"; // começa com Entrada


// ===============================
// FUNÇÃO PARA ORDENAR POR HORÁRIO
// ===============================
function ordenarLogs() {
  logs.sort((a, b) => {
    const [h1, m1, s1] = a.time.split(":").map(Number);
    const [h2, m2, s2] = b.time.split(":").map(Number);

    const total1 = h1 * 3600 + m1 * 60 + s1;
    const total2 = h2 * 3600 + m2 * 60 + s2;

    return total1 - total2; // menor → maior
  });
}


// ===============================
// RENDERIZA A LISTA
// ===============================
function renderizarLogs() {
  ordenarLogs();

  logsList.innerHTML = "";

  logs.forEach(log => {
    const li = document.createElement("li");
    li.className = "log-item";

    li.innerHTML = `
      <div class="log-left">
        <span class="log-icon">${log.icon}</span>
        <span class="log-label">${log.type}</span>
      </div>
      <span class="log-time">${log.time}</span>
    `;

    logsList.appendChild(li);
  });
}


// ===============================
// MARCAR PONTO (ENTRADA / SAÍDA)
// ===============================
function marcarPonto() {
  const agora = new Date();

  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  let tipo, icone;

  if (ultimoTipo === "Saída") {
    tipo = "Entrada";
    icone = "🟩";
    ultimoTipo = "Entrada";
  } else {
    tipo = "Saída";
    icone = "🟧";
    ultimoTipo = "Saída";
  }

  logs.push({
    type: tipo,
    icon: icone,
    time: `${horas}:${minutos}:${segundos}`
  });

  if (logs.length > 20) logs.shift(); // mantém só os últimos 20

  renderizarLogs();
}


// ===============================
// EVENTO DO BOTÃO
// ===============================
document.getElementById("btn-marcar").addEventListener("click", marcarPonto);


// ===============================
// INICIALIZAÇÃO
// ===============================
renderizarLogs();
