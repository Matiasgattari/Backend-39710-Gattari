import { userManager } from "../../public/dao/UserManager.js"
import { winstonLogger } from "../utils/winstonLogger.js"

class UsuariosRepository {
    
  async crearUsuario(user) {
    const creado = await userManager.createUser(user)
    winstonLogger.debug("usuario creado repository: " + creado)
    return creado
  }
 
  async buscarUsuarioPorUsername(userName){
    const user = await userManager.getUserByUserName(userName)
    return user
    
  }
  async buscarUsuariosPorId(id){
    const user = await userManager.getUserById(id)
    return user
    
  }
  async buscarUsuarios(){
    const users= await userManager.getUsers() 
    return users
    
  }

  async eliminarUsuario(id){
    const user = await userManager.deleteUser(id) 
    winstonLogger.debug("Usuario a eliminar repository: " + user)
    return user
  }

  async actualizarUsuario(id,nuevoModificado){
    const user = await userManager.updateUser(id,nuevoModificado) 
    return user
  }


}
export const usuariosRepository = new UsuariosRepository()