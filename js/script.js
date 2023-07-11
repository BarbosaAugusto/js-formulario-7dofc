class Aniversariante {

    constructor() {
        this.id = 1;
        this.arrayAniversariante = []
    }

    salvar() {
        let aniversariante = this.lerDados();
        
        console.log(aniversariante);
    }

    lerDados() {
        let aniversariante = {}

        aniversariante.id = this.id;
        aniversariante.nomeAniversariante = document.getElementById("nome").value;
        aniversariante.nascimento = document.getElementById("nascimento").value;

        return aniversariante;
    }

    validaCampos() {

    }

    cancelar() {

    }
}

var aniversariante = new Aniversariante();