document.addEventListener('DOMContentLoaded', () => {
  // ===== Tema =====
  const btnLight = document.getElementById('btnLight');
  const btnDark = document.getElementById('btnDark');

  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  applyTheme(localStorage.getItem('theme') || 'light');

  btnLight.addEventListener('click', () => applyTheme('light'));
  btnDark.addEventListener('click', () => applyTheme('dark'));

  // ===== Carrinho =====
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const cartList = document.getElementById('cartList');

  function updateCart(){
    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  function renderCart(){
    cartList.innerHTML = '';
    if(cart.length === 0){
      cartList.textContent = 'Seu carrinho está vazio.';
      return;
    }

    // Contagem de produtos iguais
    const productCount = {};
    cart.forEach(p => productCount[p] = (productCount[p] || 0) + 1);

    Object.keys(productCount).forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <span>${product} - Quantidade: ${productCount[product]}</span>
        <div>
          <button class="add" data-product="${product}">+</button>
          <button class="remove" data-product="${product}">-</button>
        </div>
      `;
      cartList.appendChild(div);
    });

    // Delegação de eventos para adicionar/remover
    cartList.querySelectorAll('.add').forEach(btn => {
      btn.onclick = () => {
        cart.push(btn.dataset.product);
        updateCart();
      };
    });

    cartList.querySelectorAll('.remove').forEach(btn => {
      btn.onclick = () => {
        const index = cart.indexOf(btn.dataset.product);
        if(index > -1){
          cart.splice(index, 1);
          updateCart();
        }
      };
    });
  }

  renderCart();
});
