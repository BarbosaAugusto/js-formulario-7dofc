class Aniversariante {

    constructor() {
        this.id = 1;
        this.arrayAniversariantes = []
        this.editId = null;
        this.carregarDados();
        this.listaTabela();
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
        this.salvarDados(); 
        this.cancelar();

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
            imgEdit.classList.add("acoes");
            td_acoes.appendChild(imgEdit);


            let imgDelete = document.createElement("img")
            imgDelete.src = "img/delete.svg"
            imgDelete.setAttribute("onclick", "aniversariante.deletar(" + this.arrayAniversariantes[i].id +")");
            imgDelete.classList.add("acoes");
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
            let data = JSON.parse(localStorage.getItem("aniversariantes"));
            let tbody = document.getElementById("tbody");

            for(let i = 0; i < this.arrayAniversariantes.length; i++) {
                if(this.arrayAniversariantes[i].id == id) {
                    this.arrayAniversariantes.splice(i, 1);
                    tbody.deleteRow(i);

                    let index = data.findIndex(item => item.id == id);
                    if (index > -1) {
                        data.splice(index, 1)
                    }
                }

                localStorage.setItem("aniversariantes", JSON.stringify(data))
            }
        }
    }

    salvarDados() {
        localStorage.setItem("aniversariantes", JSON.stringify(this.arrayAniversariantes));
    }

    carregarDados() {
        const data = localStorage.getItem("aniversariantes");
        if(data) {
            this.arrayAniversariantes = JSON.parse(data);
            this.id = this.arrayAniversariantes.length > 0 ? this.arrayAniversariantes[this.arrayAniversariantes.length - 1].id + 1 : 1;
        }
    }
}

var aniversariante = new Aniversariante();