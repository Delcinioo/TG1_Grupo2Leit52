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
}