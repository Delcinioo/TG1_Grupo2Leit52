export class LojaModel {
  constructor() {
    this.produtos = [];
    this.carrinho = [];
  }

  adicionarAoCarrinho(nome, preco, quantidadeDesejada) {
    const produtoLoja = this.produtos.find(p => p.nome === nome);

    if (produtoLoja && produtoLoja.quantidade >= quantidadeDesejada) {
      produtoLoja.quantidade -= quantidadeDesejada; // Diminui o stock disponível

      const indexCarrinho = this.carrinho.findIndex(p => p.nome === nome);
      if (indexCarrinho !== -1) {
        this.carrinho[indexCarrinho].quantidade += quantidadeDesejada;
      } else {
        this.carrinho.push({ nome, preco, quantidade: quantidadeDesejada });
      }
      return true;
    }
    return false;
  }

  removerDoCarrinho(nome) {
    const index = this.carrinho.findIndex(p => p.nome === nome);
    if (index !== -1) {
      const item = this.carrinho[index];
      const produtoLoja = this.produtos.find(p => p.nome === nome);
      if (produtoLoja) produtoLoja.quantidade += item.quantidade;
      this.carrinho.splice(index, 1);
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

  listarCarrinho() { return this.carrinho; }
  calcularQuantidadeTotal() { return this.carrinho.reduce((soma, p) => soma + p.quantidade, 0); }
  calcularPrecoTotal() { return this.carrinho.reduce((soma, p) => soma + (p.preco * p.quantidade), 0); }

  reiniciarCarrinho() {
    this.carrinho = [];
    // Remove definitivamente da loja apenas os que chegaram a zero
    this.produtos = this.produtos.filter(p => p.quantidade > 0);
  }
}