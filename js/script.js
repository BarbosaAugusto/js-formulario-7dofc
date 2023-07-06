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
    botaoEditar.addEventListener("click", function(id) {
        editarElemento(this.parentNode.parentNode, id);
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
  
function editarElemento(linha) {
    const colunaNome = linha.querySelector(".celula-nome");
    const colunaAniversario = linha.querySelector(".celula-data");
  
    const nomeAtual = colunaNome.textContent;
    const aniversarioAtual = colunaAniversario.textContent;
    const partesData = aniversarioAtual.split('/');
    
    const dia = partesData[0].padStart(2, '0');
    const mes = partesData[1].padStart(2, '0');
    const ano = partesData[2];
    
    const formatoAceito = `${ano}-${mes}-${dia}`;
    
    
    console.log(formatoAceito)

    const campoName = document.querySelector("#nome");
    const campoAniversario = document.querySelector("#aniversario")

    campoName.value = nomeAtual;
    campoAniversario.value = formatoAceito;
    campoName.focus()
    



    campoName.addEventListener("input", updateValueNome);
    campoAniversario.addEventListener("input", updateValueAniversario);

    function updateValueNome(e) {
        colunaNome.textContent = e.target.value;
    }

    function updateValueAniversario(e) {
        colunaAniversario.textContent = e.target.value;
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