const form = document.querySelector(".js-form");

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    criaElemento(evento.target.elements['name'].value, evento.target.elements['birth'].value)
})

function criaElemento(name, birth) {
    console.log(name);
    console.log(birth);
}