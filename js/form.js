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

  // Formulário
  const form = document.getElementById('myForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const output = document.getElementById('output');

  // Função para salvar dados do formulário no localStorage
  function saveFormData(){
    localStorage.setItem('formData', JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    }));
  }

  // Atualiza o localStorage em tempo real
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', saveFormData);
  });

  // Restaura dados salvos no formulário
  const savedForm = JSON.parse(localStorage.getItem('formData'));
  if(savedForm){
    nameInput.value = savedForm.name || '';
    emailInput.value = savedForm.email || '';
    messageInput.value = savedForm.message || '';
  }

  // Envio do formulário
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    };
    sessionStorage.setItem('submittedForm', JSON.stringify(formData));

    output.textContent = `Nome: ${formData.name}
Email: ${formData.email}
Mensagem: ${formData.message}`;

    alert('Formulário enviado e salvo em sessionStorage!');
  });

  // Detecta alterações em outras abas
  window.addEventListener('storage', event => {
    if(event.key === 'theme'){
      applyTheme(event.newValue);
    }
    if(event.key === 'formData'){
      const data = JSON.parse(event.newValue);
      nameInput.value = data.name || '';
      emailInput.value = data.email || '';
      messageInput.value = data.message || '';
    }
  });
});
