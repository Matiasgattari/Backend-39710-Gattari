
const formLogin = document.querySelector('#formLogin')

if (formLogin instanceof HTMLFormElement) {
    formLogin.addEventListener('submit', async event => {
    event.preventDefault()

    const input_email_login = document.querySelector('#input_email_login')
    const input_password_login = document.querySelector('#input_password_login')
    

    if (
        input_email_login instanceof HTMLInputElement &&
    input_password_login instanceof HTMLInputElement  
      
    ){ 
        const loginUsuario = {email: input_email_login.value,password:input_password_login.value}
 

const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginUsuario)
  });
  
  if (!response.ok) {
    throw new Error('SERVER-COMUNICATION-ERROR');
  }

  
  const usuarioLogeado = await response.json();

      if(response.ok) {
        const url = window.location.origin; //obtiene la URL actual
        const url2 = url + "/api/sessions/current" //agrega el string al final
        window.location.href = url2
       
      }
    }

  })


}
