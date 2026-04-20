export class LojaModel {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(nome, preco) {
        const produto = {
            //id: Date.now(), // identificador simples
            nome: nome,
            preco: parseFloat(preco)
        };

        this.produtos.push(produto);
        return produto;
    }

    listarProdutos() {
        return this.produtos;
    }
}

// exportar instância
export const lojaModel = new LojaModel();