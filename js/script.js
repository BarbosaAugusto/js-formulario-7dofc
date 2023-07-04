import idadeValida from "./valida-idade.js";

const form = document.querySelector("#form");
const formField = document.querySelectorAll("[required]");
const listaAniversariantes = JSON.parse(localStorage.getItem("listaAniversariantes")) || [];

console.log(listaAniversariantes)


form .addEventListener("submit", (evento) => {
    evento.preventDefault();
    criaElemento(evento.target.elements['nome'].value, evento.target.elements['aniversario'].value)
})
 
function criaElemento(nome, aniversario) {
    const tabela = document.querySelector("#tabela-dados tbody");
  
    const novaLinha = document.createElement("tr");
    const colunaNome = document.createElement("td");
    const colunaAniversario = document.createElement("td");
    const colunaAcoes = document.createElement("td");
    
    colunaNome.textContent = nome;
    colunaAniversario.textContent = aniversario;
    
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
    
    const aniversarianteAtual = {
        nome: nome,
        aniversario: aniversario
    };
    
    listaAniversariantes.push(aniversarianteAtual)

    localStorage.setItem("listaAniversariantes", JSON.stringify(listaAniversariantes))

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