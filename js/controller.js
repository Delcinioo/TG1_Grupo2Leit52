import { LojaModel } from './model.js';
import { LojaView } from './view.js';

class LojaController {

    constructor(model, view) { 
        this.model = model;
        this.view = view;
    }

    init() {
        const form = document.getElementById("formCarrinho");
        const camponome = document.getElementById("nomeProduto");
        const campopreco = document.getElementById("precoProduto");

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = camponome.value;
            const precoRaw = campopreco.value;

            let valido = true;

            // limpar erros antes de validar
            this.view.limparTodosErros();

            // VALIDAR NOME

            const resultadoNome = this.validarNomeProduto(nome);

            if (!resultadoNome.valido) {
                this.view.mostrarErro(camponome, "erroNome");
                document.getElementById("erroNome").innerText = resultadoNome.msg;
                valido = false;
            } else {
                this.view.limparErro(camponome, "erroNome");
            }

            // VALIDAR PREÇO

            const resultadoPreco = this.validarPreco(precoRaw);

            if (!resultadoPreco.valido) {
                this.view.mostrarErro(campopreco, "erroPreco");
                document.getElementById("erroPreco").innerText = resultadoPreco.msg;
                valido = false;
            } else {
                this.view.limparErro(campopreco, "erroPreco");
            }

            // SE TUDO FOR VÁLIDO

            if (valido) {
                this.model.adicionarProduto(nome.trim(), resultadoPreco.valor);

                this.view.renderizarProdutos(this.model.listarProdutos());

                camponome.value = "";
                campopreco.value = "";
            }
        });
    }

    // VALIDAR NOME

    validarNomeProduto(nome) {
        nome = nome.trim();

        const regex = /^[a-zA-ZÀ-ÿ0-9\s\-&]+$/;

        if (!nome) {
            return { valido: false, msg: "Preencha o nome" };
        }

        if (nome.length < 3) {
            return { valido: false, msg: "Nome muito curto (mín. 3 caracteres)" };
        }

        if (!regex.test(nome)) {
            return { valido: false, msg: "Nome contém caracteres inválidos" };
        }

        if (/^\d+$/.test(nome)) {
            return { valido: false, msg: "O nome não pode ser só números" };
        }

        return { valido: true };
    }

    // VALIDAR PREÇO
    
    validarPreco(precoBruto) {
        
        precoBruto = precoBruto.trim();

        if (!precoBruto) {
            return { valido: false, msg: "Preencha o preço" };
        }

        const preco = parseFloat(precoBruto);

        if (isNaN(preco)) {
            return { valido: false, msg: "Preço inválido" };
        }

        if (preco <= 0) {
            return { valido: false, msg: "Preço deve ser maior que 0" };
        }

        if (preco > 1000000) {
            return { valido: false, msg: "Preço demasiado alto" };
        }

        return { valido: true, valor: preco };
    }
}

// =========================
// INICIALIZAÇÃO
// =========================
const model = new LojaModel();
const view = new LojaView();
const controller = new LojaController(model, view);

controller.init();