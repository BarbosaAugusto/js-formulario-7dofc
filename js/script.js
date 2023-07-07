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

    
    const aniversarianteAtual = {
        "id": Date.now(),
        "nome": nome.value,
        "aniversario": aniversario.value
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
    
    const formatandoData = aniversariante.aniversario;
    const dataAniversario = new Date(formatandoData);
    const dia = dataAniversario.getDate() +1;
    const mes = dataAniversario.getMonth() + 1;
    const ano = dataAniversario.getFullYear();
    const dataFormatada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
    console.log(dataFormatada)

    colunaNome.textContent = aniversariante.nome;
    colunaAniversario.textContent = dataFormatada;
    colunaNome.dataset.id = aniversariante.id;

    const botaoEditar = document.createElement("button");
    botaoEditar.innerText = "Editar";
    botaoEditar.addEventListener("click", function() {
        editarElemento(aniversariante);
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
  
function editarElemento(aniversariante) {
    const formEdicao = document.querySelector("[data-form]");
    const nome = document.querySelector("#nome");
    const aniversario = document.querySelector("#aniversario");
    const linha = document.querySelector(`td[data-id="${aniversariante.id}"]`).parentNode;
    const celulaNome = linha.querySelector(".celula-nome");
    const celulaAniversario = linha.querySelector(".celula-data");

    nome.value = aniversariante.nome;
    aniversario.value = aniversariante.aniversario;
    nome.focus();
    
    nome.addEventListener("input", atualizarValorNome);
    aniversario.addEventListener("input", atualizarValorAniversario);
    
    
    function formatarData(data) {
        const dataAniversario = new Date(data);
        const dia = dataAniversario.getDate() +1;
        const mes = dataAniversario.getMonth() + 1;
        const ano = dataAniversario.getFullYear();
        const dataFormatada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
        return dataFormatada;
    }

    function atualizarValorNome(e) {
        celulaNome.textContent = e.target.value;
    }
    
    function atualizarValorAniversario(e) {
        const dataFormatada = formatarData(e.target.value);
        celulaAniversario.textContent = dataFormatada;
    }
}
    




 
  
  

// formField.forEach((campo) => {
//     campo.addEventListener("blur", () => verificaCampo(campo))
// })

// function verificaCampo(campo) {
//     if (campo.name == "aniversario" && campo.value != "") {
//         idadeValida(campo);
//     }
// }