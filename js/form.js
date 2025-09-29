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


  const form = document.getElementById('myForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const output = document.getElementById('output');


  function saveFormData(){
    localStorage.setItem('formData', JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    }));
  }

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', saveFormData);
  });


  const savedForm = JSON.parse(localStorage.getItem('formData'));
  if(savedForm){
    nameInput.value = savedForm.name || '';
    emailInput.value = savedForm.email || '';
    messageInput.value = savedForm.message || '';
  }


  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    };


    sessionStorage.setItem('submittedForm', JSON.stringify(formData));
    localStorage.setItem('formSubmitted', Date.now());
    output.textContent = `Nome: ${formData.name}
Email: ${formData.email}
Mensagem: ${formData.message}`;

    alert('Formulário enviado e salvo em sessionStorage!');
  });


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

    if(event.key === 'formSubmitted'){

      alert('Formulário foi enviado em outra aba!');
    }
  });
});
