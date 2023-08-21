import { usuariosRepository } from "../../repository/usuariosRepository.js";

export async function getMulterDocuments(req,res,next){
    try {
        const usuarioBuscado = await usuariosRepository.buscarUsuarioPorUsername(req.user.email)
        res.render("archivoMulter",{
                    user:usuarioBuscado["_id"]
                    })
    } catch (error) {
        req.logger.error(error.message)
        next(error)
      }
}