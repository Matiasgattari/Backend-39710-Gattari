import { Product } from "../entidades/Product.js"

class ProductosService {
  async crearProducto(producto) {
    const creado = new Product(producto)
    return await creado.dto()
  }
   
}
export const productosService = new ProductosService()