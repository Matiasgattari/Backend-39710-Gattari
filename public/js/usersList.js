const botonSubmitModificarRol = document.getElementById("botonSubmitModificarRol");
botonSubmitModificarRol?.addEventListener("click", async (e) => {
    e.preventDefault();

    const inputUsernameModificar = document.getElementById("inputIdUsuarioModificar");
    // @ts-ignore
    const valorInputUsernameModificar = inputUsernameModificar?.value;

    try {
        const response = await fetch(`/api/users/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: valorInputUsernameModificar })
        });

        if (!response.ok) {
            throw new Error('NOT-FOUND');
        }

        const rolModificadoRespuesta = await response.json();

        if (response.ok) {
            if(response.status===203){
                alert(rolModificadoRespuesta.message)
                location.reload()
            }else{
                location.reload()
            }
        }

    } catch (error) {
        if(error.message==="NOT-FOUND"){
            alert("El usuario ingresado no es valido")
        }
        location.reload()
    }
});
