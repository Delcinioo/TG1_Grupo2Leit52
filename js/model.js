export class LojaModel {
  constructor() {
    this.produtos = [];
    this.carrinho = [];
  }

  adicionarAoCarrinho(nome, preco, quantidade) {
    const index = this.carrinho.findIndex(p => p.nome.toLowerCase() === nome.toLowerCase());
    if (index !== -1) {
      this.carrinho[index].quantidade += quantidade;
    } else {
      this.carrinho.push({ nome, preco, quantidade });
    }
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
    return this.carrinho.reduce((soma, p) => soma + p.quantidade, 0);
  }

  calcularPrecoTotal() {
    return this.carrinho.reduce((soma, p) => soma + (p.preco * p.quantidade), 0);
  }

  reiniciarCarrinho() {
    this.carrinho = [];
  }

  listarCarrinho() {
    return this.carrinho;
  }
}