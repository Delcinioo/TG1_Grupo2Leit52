import { LojaModel } from './model.js';
import { LojaView } from './view.js';
 
class LojaController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
 
  init() {
    const form = document.getElementById("formProduto");
    const campoNome = document.getElementById("nomeProduto");
    const campoPreco = document.getElementById("precoProduto");
    const campoQtd = document.getElementById("quantidadeProduto");
 
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.view.limparTodosErros();
 
      const nome = campoNome.value;
      const precoRaw = campoPreco.value;
      const qtdRaw = campoQtd.value;
      let valido = true;
 
      const resNome = this.validarNome(nome);
      if (!resNome.valido) { this.view.mostrarErro(campoNome, "erroNome", resNome.msg); valido = false; }
 
      const resPreco = this.validarPreco(precoRaw);
      if (!resPreco.valido) { this.view.mostrarErro(campoPreco, "erroPreco", resPreco.msg); valido = false; }
 
      const resQtd = this.validarQuantidade(qtdRaw);
      if (!resQtd.valido) { this.view.mostrarErro(campoQtd, "erroQuantidade", resQtd.msg); valido = false; }
 
      if (!valido) return;
 
      this.model.adicionarProduto(nome.trim(), resPreco.valor, resQtd.valor);
      this.actualizarInterface();
 
      campoNome.value = "";
      campoPreco.value = "";
      campoQtd.value = "1";
      campoNome.focus();
    });
 
    document.addEventListener('click', (e) => {
      // Botões +/−
      if (e.target.classList.contains('qty-btn')) {
        const index = e.target.getAttribute('data-index');
        const acao = e.target.getAttribute('data-acao');
        const input = document.getElementById(`qtd-${index}`);
        const max = parseInt(e.target.getAttribute('data-max') || input.max);
        let val = parseInt(input.value) || 1;
 
        if (acao === 'inc' && val < max) input.value = val + 1;
        if (acao === 'dec' && val > 1) input.value = val - 1;
        return;
      }
 
      // Comprar
      if (e.target.classList.contains('btn-carrinho')) {
        const nome = e.target.getAttribute('data-nome');
        const index = e.target.getAttribute('data-index');
        const qtdInput = document.getElementById(`qtd-${index}`);
        const quantidadeDesejada = parseInt(qtdInput.value);
 
        const produtoOriginal = this.model.listarProdutos().find(p => p.nome === nome);
        if (produtoOriginal) {
          const sucesso = this.model.adicionarAoCarrinho(nome, produtoOriginal.preco, quantidadeDesejada);
          if (!sucesso) alert("Quantidade indisponível no stock!");
          this.actualizarInterface();
        }
      }
 
      // Remover
      if (e.target.classList.contains('btn-remover')) {
        const nome = e.target.getAttribute('data-nome');
        this.model.removerDoCarrinho(nome);
        this.actualizarInterface();
      }
    });
 
    document.getElementById("btnEncerrar").addEventListener('click', () => {
      if (confirm("Deseja realmente encerrar a compra?")) {
        this.model.reiniciarCarrinho();
        this.actualizarInterface();
      }
    });
  }
 
  validarNome(nome) {
    nome = nome.trim();
    const regex = /^[a-zA-ZÀ-ÿ0-9\s\-&]+$/;
    if (!nome) return { valido: false, msg: "Preencha o nome" };
    if (nome.length < 3) return { valido: false, msg: "Mínimo 3 caracteres" };
    if (!regex.test(nome)) return { valido: false, msg: "Caracteres inválidos" };
    if (/^\d+$/.test(nome)) return { valido: false, msg: "Nome não pode ser só números" };
    return { valido: true };
  }
 
  validarPreco(precoBruto) {
    if (!precoBruto || precoBruto === "") return { valido: false, msg: "Preencha o preço" };
    const preco = parseFloat(precoBruto);
    if (isNaN(preco)) return { valido: false, msg: "Preço inválido" };
    if (preco <= 0) return { valido: false, msg: "Preço deve ser maior que 0" };
    if (preco > 1000000) return { valido: false, msg: "Preço demasiado alto" };
    return { valido: true, valor: preco };
  }
 
  validarQuantidade(qtdBruto) {
    if (!qtdBruto || qtdBruto === "") return { valido: false, msg: "Preencha a quantidade" };
    const qtd = parseInt(qtdBruto);
    if (isNaN(qtd) || qtd < 1) return { valido: false, msg: "Quantidade mínima é 1" };
    if (qtd > 9999) return { valido: false, msg: "Quantidade demasiado alta" };
    return { valido: true, valor: qtd };
  }
 
  actualizarInterface() {
    this.view.renderizarProdutos(this.model.listarProdutos());
    this.view.renderizarCarrinho(this.model.listarCarrinho());
    this.view.renderizarTotais(
      this.model.calcularQuantidadeTotal(),
      this.model.calcularPrecoTotal()
    );
  }
}
 
const model = new LojaModel();
const view = new LojaView();
const controller = new LojaController(model, view);
controller.init();