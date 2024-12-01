document.addEventListener("DOMContentLoaded", carregarHistorico);

function calcularMedia() {
  const nome = document.getElementById("nome").value.trim();
  const disciplina = document.getElementById("disciplina").value;
  const nota1 = parseFloat(document.getElementById("nota1").value) || 0;
  const nota2 = parseFloat(document.getElementById("nota2").value) || 0;
  const nota3 = parseFloat(document.getElementById("nota3").value) || 0;
  const nota4 = parseFloat(document.getElementById("nota4").value) || 0;

  if (!nome || !disciplina) {
    alert("Por favor, preencha o nome e selecione uma disciplina.");
    return;
  }

  const media = (nota1 + nota2 + nota3 + nota4) / 4;
  const resultado = document.getElementById("resultado");

  const status = media >= 60 ? "Aprovado" : "Reprovado";
  resultado.textContent = `Média: ${media.toFixed(2)} - ${status}`;
  if (media >= 60) {
    resultado.style.color = "white";
    resultado.style.backgroundColor = "#28a745";
    resultado.style.padding = "10px";
    resultado.style.borderRadius = "5px";
  } else {
    resultado.style.color = "white";
    resultado.style.backgroundColor = "#dc3545";
    resultado.style.padding = "10px";
    resultado.style.borderRadius = "5px";
  }

  salvarHistorico(nome, disciplina, media.toFixed(2), status);
  carregarHistorico();
}

function salvarHistorico(nome, disciplina, media, status) {
  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  historico.push({ nome, disciplina, media, status });
  localStorage.setItem("historico", JSON.stringify(historico));
}

function carregarHistorico() {
  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  const lista = document.getElementById("listaHistorico");
  lista.innerHTML = "";

  historico.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `Aluno: ${item.nome}, Disciplina: ${item.disciplina}, Média: ${item.media}, Status: ${item.status}`;
    lista.appendChild(li);
  });
}

function limparFormulario() {
  document.getElementById("resultado").textContent = "";
}


function carregarHistorico() {
  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  const lista = document.getElementById("listaHistorico");
  const botaoLimpar = document.querySelector("#historico button");
  const tituloHistorico = document.getElementById("tituloHistorico");

  lista.innerHTML = "";

  if (historico.length > 0) {
    historico.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `Aluno: ${item.nome}, Disciplina: ${item.disciplina}, Média: ${item.media}, Status: ${item.status}`;
      lista.appendChild(li);
    });
    botaoLimpar.style.display = "inline-block";
    tituloHistorico.style.display = "block";
  } else {
    botaoLimpar.style.display = "none";
    tituloHistorico.style.display = "none";
  }

  botaoLimpar.style.display = historico.length > 0 ? "inline-block" : "none";
}

function limparHistorico() {
  localStorage.removeItem("historico");
  carregarHistorico();
}