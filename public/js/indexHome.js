
// @ts-ignore
const serverSocket = io()

const cargarBTN = document.getElementById('botonCargar')


const eliminarBTN = document.getElementById('botonEliminar')

const eliminarID = document.getElementById('eliminarID')

const titulo = document.getElementById('titulo')

const descripcion = document.getElementById('descripcion')

const precio = document.getElementById('precio')

const urlIMG = document.getElementById('urlIMG')

const stock = document.getElementById('stock')

const codigo = document.getElementById('codigo')

const categoria = document.getElementById('categoria')
const statusTrue = document.getElementById('status')



//doy funcionalidad al boton de eliminar producto "ELIMINAR"
eliminarBTN?.addEventListener("click", (e)=>{
    e.preventDefault()
   // @ts-ignore
    const idEliminar = eliminarID?.value

    serverSocket.emit('eliminarProducto', idEliminar)
    location.reload()
}, {once: true} )

//doy funcionalidad al boton de agregar productos "CARGAR"
// @ts-ignore
cargarBTN?.addEventListener("click", (e)=>{
    e.preventDefault()
    // @ts-ignore
    const valorTitulo= titulo?.value
    // @ts-ignore
    const valorDescripcion= descripcion?.value
    // @ts-ignore
    const valorPrecio= parseInt(precio?.value)
    // @ts-ignore
    const valorUrlIMG= urlIMG?.value
    // @ts-ignore
    const valorStock= parseInt(stock?.value)
    // @ts-ignore
    const valorCodigo= codigo?.value
    // @ts-ignore
    const valorCategoria= categoria?.value
    // @ts-ignore
    const valorStatus= statusTrue?.value || true

    const productoAgregar = {"title":valorTitulo,"description":valorDescripcion,"price":valorPrecio,"thumbnail":valorUrlIMG,"stock":valorStock,"code":valorCodigo,"category":valorCategoria,"status":valorStatus}

serverSocket.emit('nuevoProducto', productoAgregar)

location.reload()



}, {once: true} )


const formulario = document.getElementById('formulario')
if(formulario){
    formulario.addEventListener('submit', e=>{
        e.preventDefault()
    })
}

//Intento de actualizacion automatica al agregar un nuevo producto    
const plantillaMensajes = `
    {{#if hayProductos}}
    <h4>PRODUCTOS</h4>
    <ul>
        {{#each productos}}
        <li>{{this}}</li>
        {{/each}}
    </ul>
    {{else}}
    <p class="text-danger">sin productos...</p>
    {{/if}}
    
    `
// @ts-ignore
const armarHtmlMensajes = Handlebars.compile(plantillaMensajes)
    
serverSocket.on('actualizarProductos', productosStorage => {
        
 try {
    const divProductos = document.getElementById('productos')
       
    if (divProductos) {
    //   const productos = []
      const productosID = []
    
    //   productosStorage.forEach(element => {productos.push(JSON.stringify(element))})
      productosStorage.forEach(element => {productosID.push(element)})

    let lista = "<ul>";
    for (let producto of productosID) {
        const productoParseado = JSON.stringify(producto)
        const IdProducto = producto._id

        const url = window.location.origin; //obtiene la URL actual
        const url2 = url + `/api/products/${IdProducto}` //agrega el string al final
                       
        lista += `<li>${productoParseado} <button onclick="window.location.href='${url2}'" >Ver</button></li>`;
        
      }
      lista += "</ul> ";
     
      divProductos.innerHTML = lista;
    }

 } catch (error) {
    throw new Error("NOT-FOUND")
 }
})


