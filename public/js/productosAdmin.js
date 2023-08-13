

const cargarBTNAdmin = document.getElementById('botonCargarAdmin')


const eliminarBTNAdmin = document.getElementById('botonEliminarAdmin')

const eliminarIDAdmin = document.getElementById('eliminarIDAdmin')

const tituloAdmin = document.getElementById('tituloAdmin')

const descripcionAdmin = document.getElementById('descripcionAdmin')

const precioAdmin = document.getElementById('precioAdmin')

const urlIMGAdmin = document.getElementById('urlIMGAdmin')

const stockAdmin = document.getElementById('stockAdmin')

const codigoAdmin = document.getElementById('codigoAdmin')

const categoriaAdmin = document.getElementById('categoriaAdmin')
const statusTrueAdmin = document.getElementById('statusAdmin')
const usuario = document.getElementById('usuario_email_input')



//doy funcionalidad al boton de eliminar producto 
eliminarBTNAdmin?.addEventListener("click",async (e)=>{
    e.preventDefault()
   // @ts-ignore
    const idEliminar = eliminarIDAdmin?.value
 
    const response = await fetch('/api/products/admin/' + idEliminar, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('NOT-FOUND');
      }
      
      const productoEliminado = await response.json();
              
    if (response.ok) {
      location.reload()
    }

})

//doy funcionalidad al boton de cargar productos
// @ts-ignore
cargarBTNAdmin?.addEventListener("click",async (e)=>{
    e.preventDefault()
    // @ts-ignore
    const valorTitulo= tituloAdmin?.value
    // @ts-ignore
    const valorDescripcion= descripcionAdmin?.value
    // @ts-ignore
    const valorPrecio= parseInt(precioAdmin?.value)
    // @ts-ignore
    const valorUrlIMG= urlIMGAdmin?.value
    // @ts-ignore
    const valorStock= parseInt(stockAdmin?.value)
    // @ts-ignore
    const valorCodigo= codigoAdmin?.value
    // @ts-ignore
    const valorCategoria= categoriaAdmin?.value
    // @ts-ignore
    const valorStatus= statusTrueAdmin?.value || true

    // @ts-ignore
    const valorUsuario = usuario?.value

    const productoAgregar = {"title":valorTitulo,"description":valorDescripcion,"price":valorPrecio,"thumbnail":valorUrlIMG,"stock":valorStock,"code":valorCodigo,"category":valorCategoria,"status":valorStatus,"owner":valorUsuario}

    const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },body:JSON.stringify(productoAgregar)
      });
      
      if (!response.ok) {
        throw new Error('NOT-FOUND');
      }
      
      const productoAgregado = await response.json();
              
    if (response.ok) {
      location.reload()
    }

})


const formularioAdmin = document.getElementById('formulario')
if(formularioAdmin){
    formularioAdmin.addEventListener('submit', e=>{
        e.preventDefault()
    })
}


const botonVerProducto = document.getElementById("botonProductoVer")
botonVerProducto?.addEventListener("click",async(e)=>{
    e.preventDefault()

    // @ts-ignore
    const valorIDVer = document.getElementById("inputProductoVer").value

    const url = window.location.origin; //obtiene la URL actual
    const url2 = url + `/api/products/${valorIDVer}/` //agrega el string al final
             
    window.location.href = url2

})
