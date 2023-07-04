import idadeValida from "./valida-idade.js";

const form = document.querySelector("#form");
const formField = document.querySelectorAll("[required]");
const listaAniversariantes = JSON.parse(localStorage.getItem("listaAniversariantes")) || [];

listaAniversariantes.forEach( (elemento) => {
    criaElemento(elemento);
})


form .addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const aniversario = evento.target.elements['aniversario'];

    const formatandoData = aniversario.value
    const dataAniversario = new Date(formatandoData);
    
    const dia = dataAniversario.getDate() + 1;
    const mes = dataAniversario.getMonth() + 1;
    const ano = dataAniversario.getFullYear();

    const dataFormatada = dia + '/' + mes + '/' + ano;
    console.log(dataFormatada);

    const aniversarianteAtual = {
        "nome": nome.value,
        "aniversario": dataFormatada
    };

    criaElemento(aniversarianteAtual);
    
    listaAniversariantes.push(aniversarianteAtual)

    localStorage.setItem("listaAniversariantes", JSON.stringify(listaAniversariantes))

    nome.value = "";
    aniversario.value = "";

})
 
function criaElemento(aniversariante) {
    const tabela = document.querySelector("#tabela-dados tbody");
  
    const novaLinha = document.createElement("tr");
    const colunaNome = document.createElement("td");
    const colunaAniversario = document.createElement("td");
    const colunaAcoes = document.createElement("td");
    
    colunaNome.textContent = aniversariante.nome;
    colunaAniversario.textContent = aniversariante.aniversario;
    
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener("click", () => {
      // Lógica para ação de editar
      console.log("Editar: " + nome);
    });
    
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", () => {
      // Lógica para ação de excluir
      console.log("Excluir: " + nome);
    });
    
    colunaAcoes.appendChild(botaoEditar);
    colunaAcoes.appendChild(botaoExcluir);
    
    novaLinha.appendChild(colunaNome);
    novaLinha.appendChild(colunaAniversario);
    novaLinha.appendChild(colunaAcoes);

    novaLinha.classList.add("linha-tabela");
    colunaNome.classList.add("celula-nome");
    colunaAniversario.classList.add("celula-data");
    colunaAcoes.classList.add("celula-acoes"); 

    tabela.appendChild(novaLinha);
}

// formField.forEach((campo) => {
//     campo.addEventListener("blur", () => verificaCampo(campo))
// })

// function verificaCampo(campo) {
//     if (campo.name == "aniversario" && campo.value != "") {
//         idadeValida(campo);
//     }
// }