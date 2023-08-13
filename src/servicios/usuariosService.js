import { userManager } from "../../public/dao/UserManager.js"
import { User } from "../entidades/User.js"


class UsuariosService {
  async crearUsuario(user) {
    const creado = new User(user)
    return creado
  }
}
export const usuariosService = new UsuariosService()