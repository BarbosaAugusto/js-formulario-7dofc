export default function idadeValida(campo) {
    const dataNascimento = new Date(campo.value);
    const dataNascimentoFormatada = ((dataNascimento.getDate() + 1)) + "/" + ((dataNascimento.getMonth() + 1)) + "/" + dataNascimento.getFullYear(); 
    console.log(dataNascimentoFormatada);
}