export class LojaModel {
  constructor() {
    this.produtos = [];
  }

  adicionarProduto(nome, preco, quantidade) {
    const index = this.produtos.findIndex(
      p => p.nome.toLowerCase() === nome.toLowerCase()
    );

    if (index !== -1) {
      // Produto já existe — incrementa quantidade
      this.produtos[index].quantidade += quantidade;
      return { novo: false, produto: this.produtos[index] };
    }

    const produto = { nome, preco, quantidade };
    this.produtos.push(produto);
    return { novo: true, produto };
  }

  listarProdutos() {
    return this.produtos;
  }

  calcularQuantidadeTotal() {
    return this.produtos.reduce((soma, p) => soma + p.quantidade, 0);
  }

  calcularPrecoTotal() {
    return this.produtos.reduce((soma, p) => soma + (p.preco * p.quantidade), 0);
  }

  reiniciarCarrinho() {
    this.produtos = [];
  }
}