import { productosRepository } from "../../repository/productosRepository.js"
import { io } from "../../servidor.js"

export async function realTimeProductsController(req, res, next){
try {
        
    const listado1 = await productosRepository.buscarProductos()
req.logger.debug('Desde el realtimeproducts controller, previo al socket')
    // recibir producto nuevo para agregar por socket.io
    io.on('connection', async clientSocket => {
        req.logger.debug('Desde el realtimeproducts controller, en el socket')
            clientSocket.on('nuevoProducto',async function agregarProd(productoAgregar){
            
            await productosRepository.crear(productoAgregar)

            })
            
            clientSocket.emit('actualizarProductos', listado1)
            

            clientSocket.on('eliminarProducto', async productoEliminar => {
              await  productosRepository.eliminarProducto(productoEliminar)
            })

    })

    const listado = [];
    
    listado1.forEach(element => {listado.push(JSON.stringify(element))});

    res.render('realTimeProducts.handlebars', {
            titulo: 'Products',
            encabezado: 'Lista de productos en base de datos',
            listado,
            hayListado: listado.length > 0
    })
} catch (error) {
        req.logger.fatal(error.message)
        next(error)
}
}