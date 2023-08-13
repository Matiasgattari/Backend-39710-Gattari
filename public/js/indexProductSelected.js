// @ts-ignore
const serverSocket = io()


const botonAgregar = document.getElementById('btn_agregar_carrito')

botonAgregar?.addEventListener('click',(e)=>{
    e.preventDefault()

const inputAgregarCarrito = document.getElementById('input_agregar_carrito')
// @ts-ignore
const valorInputAgregarCarrito= inputAgregarCarrito?.value

serverSocket.emit('agregarProducto', valorInputAgregarCarrito)
// location.reload()


})