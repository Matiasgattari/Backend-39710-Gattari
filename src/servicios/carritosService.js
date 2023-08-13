import { Cart } from "../entidades/Carts.js"

class CarritosService {
  async crearCarrito() {
    const creado = new Cart()
    return creado
  }
}
export const carritosService = new CarritosService()