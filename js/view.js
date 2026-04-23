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
        <button class="btn-carrinho" data-nome="${produto.nome}">Comprar</button>
      `;
      lista.appendChild(card);
    });
  }

  renderizarCarrinho(itens) {
    const container = document.getElementById("itensCarrinho");
    container.innerHTML = "";
    if (itens.length === 0) {
      container.innerHTML = '<p class="empty-message">O carrinho está vazio.</p>';
      return;
    }

    itens.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("card-produto");
      div.innerHTML = `
        <span class="nome-produto">${item.nome}</span>
        <span class="quantidade-badge">x${item.quantidade}</span>
        <span class="preco-produto">${(item.preco * item.quantidade).toFixed(2)} MZN</span>
      `;
      container.appendChild(div);
    });
  }

  renderizarTotais(quantidade, preco) {
    const resumo = document.getElementById("resumoCarrinho");
    if (quantidade > 0) {
      resumo.classList.remove("hide");
      document.getElementById("totalItens").innerText = quantidade;
      document.getElementById("valorTotal").innerText = preco.toFixed(2);
    } else {
      resumo.classList.add("hide");
    }
  }
}