import idadeValida from "./valida-idade.js";

const form = document.querySelector("#form");
const formField = document.querySelectorAll("[required]");

form .addEventListener("submit", (evento) => {
    evento.preventDefault();
    criaElemento(evento.target.elements['name'].value, evento.target.elements['birth'].value)
})

function criaElemento(name, birth) {
    console.log(name, birth)
}

formField.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo))
})

function verificaCampo(campo) {
    if (campo.name == "birth" && campo.value != "") {
        idadeValida(campo);
    }
}