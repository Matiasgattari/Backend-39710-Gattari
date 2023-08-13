function validarMail(str) {
  // Comprobar si el string tiene . y @ usando el método includes
  return str.includes(".") && str.includes("@");
}

function soloLetras(palabra) {
  // Crear una expresión regular que acepte solo letras de la a a la z en mayúsculas o minúsculas
  let letras = /^[a-zA-Z]+$/;
  return letras.test(palabra); //true si coincide con la exp regular
}

const formRegister = document.querySelector('#formRegister')

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', async event => {
    event.preventDefault()

    const input_first_name = document.querySelector('#input_first_name')
    const input_last_name = document.querySelector('#input_last_name')
    const input_email = document.querySelector('#input_email')
    const input_age = document.querySelector('#input_age')
    const input_password = document.querySelector('#input_password')
    const input_rol = document.querySelector('#input_rol')
    // const input_cart = document.querySelector('#input_cart')

    if (
      input_first_name instanceof HTMLInputElement &&
      input_last_name instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_age instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement&&
      input_rol instanceof HTMLInputElement 
      // input_cart instanceof HTMLInputElement
    ) {


if(!soloLetras(input_first_name.value)){alert('El nombre solo puede utilizar letras a-z')}
if(!soloLetras(input_last_name.value)){alert('El apellido solo puede utilizar letras a-z')}
if(!validarMail(input_email.value)){alert('El email debe tener formato usuario@servidor.dominio')}

      const datosUsuario = {
        first_name: input_first_name.value,
        last_name: input_last_name.value,
        email: input_email.value,
        age: input_age.value,
        password: input_password.value,
        rol: input_rol.value,
        // cart: input_cart.value,
      }

      
    if(datosUsuario.email=='adminCoder@coder.com'&& datosUsuario.password=="adminCod3r123"){
        datosUsuario.rol="Admin"
    }
      
const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosUsuario)
  });
  
  if (!response.ok) {
    throw new Error('NOT-FOUND');
  }
  
  const usuarioCreado = await response.json();

if (response.ok) {

  const url = window.location.origin; //obtiene la URL actual
  const url2 = url + `/api/sessions/current` //agrega el string al final
  window.location.href = url2
}
    }


  })
}
