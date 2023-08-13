
const formularioAgregar = document.getElementById("formularioAgregadoProductoSIndividual")
formularioAgregar?.addEventListener("submit",e=>e.preventDefault())

const botonAgregarCadaProducto = document.getElementById("botonAregarCadaProducto")
botonAgregarCadaProducto?.addEventListener("click",async ()=>{
    // @ts-ignore
    const IDCarrito = document.getElementById("carritoAAgregar").value
    // @ts-ignore
    const idProducto = document.getElementById("idProductoAgregar").value
    // construir la URL del endpoint con los parámetros
    const urlOrigin = window.location.origin; //obtiene la URL actual
    const urlOrigin2 = urlOrigin + `/api/carts/${IDCarrito}/product/${idProducto}` //agrega el string al final
   
    // hacer una petición POST usando fetch
    try {
      const response = await fetch(urlOrigin2, {
        method: "POST",
      });
      const data = await response.json(); 
      // redireccionar la página después de que se complete la petición
      const url1 = window.location.origin; //obtiene la URL actual
      const url2 = url1 + `/api/carts/${IDCarrito}` //agrega el string al final
               
      window.location.href = url2;

    } catch (error) {
      // manejar el error
      console.error(error);
    }

})




const botonVolverAProductos = document.getElementById("volverAProductos")
botonVolverAProductos?.addEventListener("click",()=>{
   
    // @ts-ignore
    const rol = document.getElementById("rol").value
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
