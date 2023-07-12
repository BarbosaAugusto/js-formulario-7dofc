class Aniversariante {

    constructor() {
        this.id = 1;
        this.arrayAniversariantes = []
        this.editId = null;
    }

    salvar() {
        let aniversariante = this.lerDados();

        if(this.validaCampos(aniversariante)) {
            if(this.editId == null) {
                this.adicionar(aniversariante);
            } else {
                this.atualizar(this.editId, aniversariante);
            }
        }

        this.listaTabela();
        this.cancelar();
        console.log(this.arrayAniversariantes);

    }

    listaTabela() {
        let tbody = document.getElementById("tbody");
        tbody.innerText = "";
        for(let i = 0; i < this.arrayAniversariantes.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nomeAniversariante = tr.insertCell();
            let td_nascimento = tr.insertCell();
            let td_acoes = tr.insertCell();

            const nascimento = this.arrayAniversariantes[i].nascimento;

            // Dividir a string de nascimento em partes separadas
            const partesData = nascimento.split("-");
            const ano = partesData[0];
            const mes = partesData[1];
            const dia = partesData[2];

            // Formatar a data no formato "dd/mm/yyyy"
            const dataFormatada = `${dia}/${mes}/${ano}`;

            console.log(dataFormatada); // Output: "dd/mm/yyyy"


            td_id.innerText = this.arrayAniversariantes[i].id;
            td_nomeAniversariante.innerText = this.arrayAniversariantes[i].nomeAniversariante;
            td_nascimento.innerText = dataFormatada;

            td_id.classList.add("center");
            td_acoes.classList.add("center");

            let imgEdit = document.createElement("img")
            imgEdit.src = "img/edit.svg"
            imgEdit.setAttribute("onclick", "aniversariante.prepararEdicao(" + JSON.stringify(this.arrayAniversariantes[i]) +")");
            td_acoes.appendChild(imgEdit);

            let imgDelete = document.createElement("img")
            imgDelete.src = "img/delete.svg"
            imgDelete.setAttribute("onclick", "aniversariante.deletar(" + this.arrayAniversariantes[i].id +")");
            td_acoes.appendChild(imgDelete);


            
        }
    }

    adicionar(aniversariante) {
        this.arrayAniversariantes.push(aniversariante);
        this.id++
    }

    atualizar(id, aniversariante) {
        for(let i = 0; i < this.arrayAniversariantes.length; i++) {
            if(this.arrayAniversariantes[i].id == id) {
                this.arrayAniversariantes[i].nomeAniversariante = aniversariante.nomeAniversariante;
                this.arrayAniversariantes[i].nascimento = aniversariante.nascimento;
            }
        }
    }

    prepararEdicao(dados) {
        this.editId = dados.id;

        document.getElementById("nome").value = dados.nomeAniversariante;
        document.getElementById("nascimento").value = dados.nascimento;  

        document.getElementById("btn1").innerText = "atualizar";
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
        document.getElementById("nome").value = "";
        document.getElementById("nascimento").value = "";

        document.getElementById("btn1").innerText = "Salvar";

        this.editId = null;
    }

    deletar(id) {

        if(confirm("Deseja realmente deletar o aniversariante do ID " + id  + " ?")) {
            let tbody = document.getElementById("tbody");
            for(let i = 0; i < this.arrayAniversariantes.length; i++) {
                if(this.arrayAniversariantes[i].id == id) {
                    this.arrayAniversariantes.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }
}

var aniversariante = new Aniversariante();