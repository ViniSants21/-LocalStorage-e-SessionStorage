document.addEventListener('DOMContentLoaded', () => {
  const btnLight = document.getElementById('btnLight');
  const btnDark = document.getElementById('btnDark');

  // Função para aplicar tema
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Aplica tema salvo ou padrão
  applyTheme(localStorage.getItem('theme') || 'light');

  btnLight.addEventListener('click', () => applyTheme('light'));
  btnDark.addEventListener('click', () => applyTheme('dark'));

  // Lista de produtos
  const products = ["Notebook", "Carro", "Iphone", "Tablet", "Monitor"];
  const productList = document.getElementById('productList');

  // Carrinho
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

  function updateCartStorage(){
    sessionStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartUpdate', Date.now()); // sinaliza para outras abas
  }

  // Renderiza produtos
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

  // Detecta alterações de cart em outras abas
  window.addEventListener('storage', (event) => {
    if(event.key === 'cartUpdate'){
      cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      console.log('Carrinho atualizado em outra aba:', cart);
    }
    if(event.key === 'theme'){
      applyTheme(event.newValue);
    }
  });
});
