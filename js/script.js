import idadeValida from "./valida-idade.js";

const form = document.querySelector("#form");
const formField = document.querySelectorAll("[required]");
const listaAniversariantes = JSON.parse(localStorage.getItem("listaAniversariantes")) || [];

listaAniversariantes.forEach((elemento) => {
    criaElemento(elemento);
})


form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const aniversario = evento.target.elements['aniversario'];

    const formatandoData = aniversario.value
    const dataAniversario = new Date(formatandoData);

    const dia = dataAniversario.getDate() + 1;
    const mes = dataAniversario.getMonth() + 1;
    const ano = dataAniversario.getFullYear();

    const dataFormatada = dia + '/' + mes + '/' + ano;

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
    const tabela = document.querySelector("#tabela-dados");

    const novaLinha = document.createElement("tr");
    const colunaNome = document.createElement("td");
    const colunaAniversario = document.createElement("td");
    const colunaAcoes = document.createElement("td");
    

    colunaNome.textContent = aniversariante.nome;
    colunaAniversario.textContent = aniversariante.aniversario;
    colunaNome.dataset.id = aniversariante.id;

    const botaoEditar = document.createElement("button");
    botaoEditar.innerText = "Editar";
    botaoEditar.addEventListener("click", function() {
        editarElemento(this.parentNode.parentNode);
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.innerText = "Excluir";

    botaoExcluir.addEventListener("click", function(id) {
        deletaElemento(this.parentNode.parentNode, id)
        
        return botaoExcluir;
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

function deletaElemento(linha, id) {
    linha.remove();

    listaAniversariantes.splice(listaAniversariantes.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("listaAniversariantes",JSON.stringify(listaAniversariantes));
}

// formField.forEach((campo) => {
//     campo.addEventListener("blur", () => verificaCampo(campo))
// })

// function verificaCampo(campo) {
//     if (campo.name == "aniversario" && campo.value != "") {
//         idadeValida(campo);
//     }
// }