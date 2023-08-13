const btnReestablecerSubmit = document.getElementById("btn_reestablecer_submit")
btnReestablecerSubmit?.addEventListener("click",async (e)=>{
    e.preventDefault()

    // @ts-ignore
    const emailReestablecer = document.getElementById("input_reestablecer_email")?.value
    // @ts-ignore
    const nameReestablecer = document.getElementById("input_reestablecer_name")?.value
    // @ts-ignore
    const lastNameReestablecer = document.getElementById("input_reestablecer_last_name")?.value
    // @ts-ignore
    const passwordReestablecer = document.getElementById("input_reestablecer_password")?.value
    // @ts-ignore
    const passwordConfirmReestablecer = document.getElementById("input_reestablecer_password_confirm")?.value

if(passwordReestablecer!==passwordConfirmReestablecer) {
    // @ts-ignore
    Swal.fire({
        title: "Las contraseñas no coinciden"   
    })
}else{
    const datosUsuario = {email:emailReestablecer,name:nameReestablecer,last_name:lastNameReestablecer,password:passwordReestablecer}

    const response = await fetch('/api/users/reestablecer', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      });
      
      if (!response.ok) {
if(response.status===504) {
    // @ts-ignore
    Swal.fire({
        // title: "Ups... Intente nuevamente"   
        title: `Las contraseñas no pueden ser identicas`   
    }).then(()=>{
        const url = window.location.origin; //obtiene la URL actual
        const url2 = url + `/api/sessions/reestablecer` //agrega el string al final
        window.location.href = url2
    })  } else {
        // @ts-ignore
        Swal.fire({
            // title: "Ups... Intente nuevamente"   
            title: `Error de credenciales, verifique bien los datos`   
        }).then(()=>{
            const url = window.location.origin; //obtiene la URL actual
            const url2 = url + `/api/sessions/reestablecer` //agrega el string al final
            window.location.href = url2
    })
}
        // @ts-ignore
        // Swal.fire({
        //     // title: "Ups... Intente nuevamente"   
        //     title: `${response.statusText}`   
        // }).then(()=>{
            // const url = window.location.origin; //obtiene la URL actual
            // const url2 = url + `/api/sessions/reestablecer` //agrega el string al final
            // window.location.href = url2
        // })
      }
      
      // @ts-ignore
      // @ts-ignore
      const usuarioCreado = await response.json();
   
    if (response.ok) {
        
        // @ts-ignore
        Swal.fire({
            title: "Contraseña reestablecida con exito"   
        }).then(()=>{

            const url = window.location.origin; //obtiene la URL actual
            const url2 = url + `/api/sessions/current` //agrega el string al final
            window.location.href = url2
        })
    }
}})