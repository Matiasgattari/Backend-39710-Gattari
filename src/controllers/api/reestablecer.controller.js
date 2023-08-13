import { usuariosRepository } from "../../repository/usuariosRepository.js"
import { hashear, validarQueSeanIguales } from "../../utils/criptografia.js";

export async function reestablecerPost(req,res,next){
    try {
        const usuarioEncontrado = await usuariosRepository.buscarUsuarioPorUsername(req.body.email)
        if(usuarioEncontrado.first_name!==req.body.name ||usuarioEncontrado.last_name!==req.body.last_name  ) {
          throw Error("ERROR_DE_AUTENTICACION")
        }
       
       if( validarQueSeanIguales(req.body.password,usuarioEncontrado.password)) {
           res.status(504).json({message:"las contraseñas no pueden ser identicas"})
        throw new Error("La contraseña no puede ser identica a la anterior")
       } else {
        usuarioEncontrado.password=hashear(req.body.password)

        const usuarioModificado = await usuariosRepository.actualizarUsuario(usuarioEncontrado._id,usuarioEncontrado)

        req.logger.http("Usuario creado correctamente:" + usuarioModificado)
        // funcion de passport para que ya me deje logueado tambien
        req.login(usuarioModificado, error => {
            if (error) {
                next(error)
            } else {
                //respuesta al servidor
                res.status(201).json(req.user)
            }
        })
       }
        
            } catch (error) {
                // res.status(501).json({message:error.message})
                    req.logger.error(error.message)
                    next(error)
                }
}