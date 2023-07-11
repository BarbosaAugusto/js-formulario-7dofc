class Aniversariante {

    constructor() {
        this.id = 1;
        this.arrayAniversariantes = []
    }

    salvar() {
        let aniversariante = this.lerDados();

        if(this.validaCampos(aniversariante)) {
            this.adicionar(aniversariante)
        }

        console.log(this.arrayAniversariantes);

    }

    adicionar(aniversariante) {
        this.arrayAniversariantes.push(aniversariante);
        this.id++
    }

    lerDados() {
        let aniversariante = {}

        aniversariante.id = this.id;
        aniversariante.nomeAniversariante = document.getElementById("nome").value;
        aniversariante.nascimento = document.getElementById("nascimento").value;

        return aniversariante;
    }

    validaCampos(aniversariante) {

        let msg = "";

        if(aniversariante.nomeAniversariante == "") {
            msg += "- Informe o nome do aniversariante \n"
        }

        if(aniversariante.nascimento == "") {
            msg += "-Informe a data de nascimento do aniversariante \n"
        }

        if(msg != "") {
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar() {

    }
}

var aniversariante = new Aniversariante();