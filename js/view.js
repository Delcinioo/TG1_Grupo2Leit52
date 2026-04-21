export class LojaView {

  mostrarErro(input, spanId, mensagem) {
    input.classList.add("input-erro");
    const span = document.getElementById(spanId);
    span.innerText = mensagem;
    span.classList.remove("hide");
  }

  limparErro(input, spanId) {
    input.classList.remove("input-erro");
    document.getElementById(spanId).classList.add("hide");
  }

  limparTodosErros() {
    document.querySelectorAll(".error").forEach(e => e.classList.add("hide"));
    document.querySelectorAll("input").forEach(i => i.classList.remove("input-erro"));
  }

  renderizarProdutos(produtos) {
    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    if (produtos.length === 0) {
      lista.innerHTML = '<p class="empty-message">Nenhum produto cadastrado ainda.</p>';
      return;
    }

    produtos.forEach(produto => {
      const card = document.createElement("div");
      card.classList.add("card-produto");
      card.innerHTML = `
        <span class="nome-produto">${produto.nome}</span>
        <span class="preco-produto">${produto.preco.toFixed(2)} MZN</span>
        <span class="quantidade-badge">x${produto.quantidade}</span>
      `;
      lista.appendChild(card);
    });
  }
}