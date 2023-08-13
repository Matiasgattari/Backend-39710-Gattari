
const botonEliminarUsuarios = document.getElementById("botonEliminarUsuarios")
botonEliminarUsuarios?.addEventListener("click",async(e)=>{
    e.preventDefault()

    const response = await fetch('/api/users/', {
        method: 'DELETE',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error('NOT-FOUND');
    }
    
    const usuariosEliminarRespuesta = await response.json();
            
    if (response.ok) {
    location.reload()
    }
})


