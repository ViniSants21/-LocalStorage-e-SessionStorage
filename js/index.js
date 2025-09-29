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

  // Produtos
  const products = ["Notebook", "Carro", "Iphone", "Tablet", "Monitor"];
  const productList = document.getElementById('productList');

  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

  function updateCartStorage(){
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  function renderProducts(){
    productList.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.textContent = product;
      div.style.cursor = 'pointer';
      div.addEventListener('click', () => {
        cart.push(product);
        updateCartStorage();
        alert(`${product} adicionado ao carrinho!`);
      });
      productList.appendChild(div);
    });
  }

  renderProducts();
});
