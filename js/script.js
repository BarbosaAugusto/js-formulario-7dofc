import idadeValida from "./valida-idade.js";

const form = document.querySelector("#form");
const formField = document.querySelectorAll("[required]");

form .addEventListener("submit", (evento) => {
    evento.preventDefault();
    criaElemento(evento.target.elements['nome'].value, evento.target.elements['aniversario'].value)
})
 
function criaElemento(nome, aniversario) {
    console.log(nome, aniversario)

    const novaPessoa = document.createElement('td');
    novaPessoa.classList.add("celula");

    const novaData = document.createElement('td');
    novaData.innerHTML = aniversario;
    
    novaPessoa.appendChild(novaData)
    novaPessoa.innerHTML += nome

    const lista = document.getElementById("corpo")

    lista.appendChild(novaPessoa)

    console.log(novaPessoa)
}

formField.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo))
})

function verificaCampo(campo) {
    if (campo.name == "aniversario" && campo.value != "") {
        idadeValida(campo);
    }
}