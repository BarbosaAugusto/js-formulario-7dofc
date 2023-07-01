import idadeValida from "./valida-idade.js";

const form = document.querySelector("#form");
const formField = document.querySelectorAll("[required]");

form .addEventListener("submit", (evento) => {
    evento.preventDefault();
    criaElemento(evento.target.elements['nome'].value, evento.target.elements['aniversario'].value)
})

function criaElemento(nome, aniversario) {
    console.log(nome, aniversario)
}

formField.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo))
})

function verificaCampo(campo) {
    if (campo.name == "aniversario" && campo.value != "") {
        idadeValida(campo);
    }
}