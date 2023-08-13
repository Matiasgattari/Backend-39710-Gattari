const botonComprar = document.getElementById("botonComprarCarrito")
botonComprar?.addEventListener("click", ()=>{
    // @ts-ignore
    const valorInputCarritoID = document.getElementById("inputCarritoID")?.value

    const url = window.location.origin; //obtengo la URL actual
    const url2 = url + `/api/carts/${valorInputCarritoID}/purchase/` //agrego el string al final
    window.location.href = url2
   
})

const botonEliminarProducto = document.getElementById("botonEliminarProducto")
botonEliminarProducto?.addEventListener("click", ()=>{
    
    // @ts-ignore
    const valorInputCarritoID = document.getElementById("inputCarritoID")?.value

    
    // @ts-ignore
    const valorInputProductoID = document.getElementById("inputProductoEliminar")?.value
   
    const url = window.location.origin; //obtiene la URL actual
    const url2 = url + `/api/carts/${valorInputCarritoID}/productoEliminar/${valorInputProductoID}/` //agrega el string al final
    window.location.href = url2
    


})

const botonVaciarCarrito = document.getElementById("botonVaciarCarrito")
botonVaciarCarrito?.addEventListener("click", ()=>{
    // @ts-ignore
    const valorInputCarritoID = document.getElementById("inputCarritoID")?.value

    const url = window.location.origin; //obtiene la URL actual
    const url2 = url + `/api/carts/${valorInputCarritoID}/vaciarCarrito/` //agrega el string al final
    window.location.href = url2
        
})


const comprarCarrito = document.getElementById("botonComprarCarrito")
comprarCarrito?.addEventListener("click",()=>{
     // @ts-ignore
    const valorInputCarritoID = document.getElementById("inputCarritoID")?.value

    const url = window.location.origin; //obtiene la URL actual
    const url2 = url + `/api/carts/${valorInputCarritoID}/purchase/` //agrega el string al final
    window.location.href = url2
     
})

const volverAProductosCarrito = document.getElementById("volverAProductosCarrito")
volverAProductosCarrito?.addEventListener("click",()=>{
    // @ts-ignore
    const rol = document.getElementById("inputRol").value
    if(rol==="Admin"){
        
        const url = window.location.origin; //obtiene la URL actual
        const url2 = url + `/api/products/admin/` //agrega el string al final
        window.location.href = url2
        } else {
            const url = window.location.origin; //obtiene la URL actual
            const url2 = url + `/home/` //agrega el string al final
            window.location.href = url2
          }
})
