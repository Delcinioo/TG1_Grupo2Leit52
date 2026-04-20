import { LojaModel } from './model.js';
import { LojaView } from './view.js';

class LojaController {

    constructor(model) { 
        this.model = model;
        this.view = view;
    }

    init() {
        
            const form = document.getElementById("formCarrinho");
            const camponome = document.getElementById("nomeProduto");
            const campopreco = document.getElementById("precoProduto");

            form.addEventListener('submit', (event) => {
                event.preventDefault();

                let nome = camponome.value;
                let preco = campopreco.value;

                if (nome.length == 0) {
                    alert('Por favor, preencha o campo: nome.');
                }else if (preco.length == 0) {
                    alert('Por favor, preencha o campo: preço.'); 
                }else if (preco <= 0) {
                    alert('Por favor, insira um preço válido.'); 
                    console.log('preco');
                } else {
                    const produto = this.model.adicionarProduto(nome, preco);
                    console.log('Produto adicionado:', produto);
                    camponome.value = "";
                    campopreco.value = "";
                    this.view.renderizarProdutos(this.model.listarProdutos());
                }
        });
    }
}

// iniciar aplicação
const model = new LojaModel();
const view = new LojaView();
const controller = new LojaController(model, view);
controller.init();