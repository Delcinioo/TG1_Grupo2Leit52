export class LojaView {

    mostrarErro(input, spanId) {
        input.style.borderColor = "red";
        document.getElementById(spanId).classList.remove("hide");
    }

    limparErro(input, spanId) {
        input.style.borderColor = "green";
        document.getElementById(spanId).classList.add("hide");
    }

    limparTodosErros() {
        document.querySelectorAll(".error").forEach(e => {
            e.classList.add("hide");
        });

        document.querySelectorAll("input").forEach(i => {
            i.style.borderColor = "";
        });
    }

    renderizarProdutos(produtos) {
        const lista = document.getElementById("listaProdutos");
        lista.innerHTML = "";

        if (produtos.length === 0) {
            lista.innerHTML = '<p class="empty-message">Nenhum produto cadastrado.</p>';
            return;
        }

        produtos.forEach(produto => {
            const card = document.createElement("div");
        card.classList.add("card-produto");

        card.innerHTML = `
            <h3 class="nome-produto">${produto.nome}</h3>
            <p class="preco-produto">${produto.preco} MZN</p>
        `;

        lista.appendChild(card);;
        });
    }
}