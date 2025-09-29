document.addEventListener('DOMContentLoaded', () => {

  const btnLight = document.getElementById('btnLight');
  const btnDark = document.getElementById('btnDark');

  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }


  applyTheme(localStorage.getItem('theme') || 'light');

  btnLight.addEventListener('click', () => applyTheme('light'));
  btnDark.addEventListener('click', () => applyTheme('dark'));


  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartList = document.getElementById('cartList');

  function updateCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartUpdate', Date.now()); 
    renderCart();
  }

  function renderCart(){
    cartList.innerHTML = '';
    if(cart.length === 0){
      cartList.textContent = 'Seu carrinho está vazio.';
      return;
    }


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


  window.addEventListener('storage', event => {
    if(event.key === 'cartUpdate'){
      cart = JSON.parse(localStorage.getItem('cart')) || [];
      renderCart();
      alert('O carrinho foi atualizado em outra aba!');
    }
    if(event.key === 'theme'){
      applyTheme(event.newValue);
    }
  });
});
