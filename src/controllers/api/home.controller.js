import { productosRepository } from "../../repository/productosRepository.js";
import util from 'node:util'

export async function homeController(req, res, next) {
  try {
    
    const listado1 = await productosRepository.buscarProductos()
    
    const producto = [];
    
    listado1.forEach(element => {producto.push(util.inspect(element, false, 10))
    });
    req.logger.debug('producto home controller : '+ producto)
    req.logger.debug('tipo de producto recibido: ' + typeof(producto[0]))
    

        res.render('home.handlebars', {
            titulo: 'Products',
            encabezado: 'Lista de productos en base de datos',
            producto:listado1,
            hayProductos: producto.length > 0
        })
  } catch (error) {
    req.logger.fatal(error.message)
    next(error)
  }
}