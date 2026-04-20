export class LojaView {

    renderizarProdutos(produtos) {
        const lista = document.getElementById("listaProdutos");
        lista.innerHTML = "";

        if (produtos.length === 0) {
            lista.innerHTML = '<p>Nenhum produto cadastrado.</p>';
            return;
        }

        produtos.forEach(produto => {
            const item = document.createElement("div");
            item.innerHTML = `
                <p>${produto.nome}</p>
                <p>${produto.preco} MZN</p>
            `;
            lista.appendChild(item);
        });
    }
}