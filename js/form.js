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

  [nameInput,emailInput,messageInput].forEach(input=>{
    input.addEventListener('input', ()=>{
      localStorage.setItem('formData',JSON.stringify({
        name:nameInput.value,
        email:emailInput.value,
        message:messageInput.value
      }));
    });
  });

  const savedForm = JSON.parse(localStorage.getItem('formData'));
  if(savedForm){
    nameInput.value = savedForm.name || '';
    emailInput.value = savedForm.email || '';
    messageInput.value = savedForm.message || '';
  }

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const formData = {
      name:nameInput.value,
      email:emailInput.value,
      message:messageInput.value
    };
    sessionStorage.setItem('submittedForm',JSON.stringify(formData));
    output.textContent = JSON.stringify(formData,null,2);
    alert('Formulário enviado e salvo em sessionStorage!');
  });
});
