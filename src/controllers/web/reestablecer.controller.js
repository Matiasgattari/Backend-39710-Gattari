import { usuariosRepository } from "../../repository/usuariosRepository.js"
import util from 'node:util'
export async function reestablecerView(req,res,next){
    try {
        const usuario = req.user.email
        const listaUsuarios = await usuariosRepository.buscarUsuarios()

        const conUtil=util.inspect(listaUsuarios, false, 10)
        const listaUsuariosArray = []
        listaUsuarios.forEach(element => listaUsuariosArray.push(util.inspect(element, false, 10)))


        const variablesLogin ={
            pageTitle:'Reestablecer',
            usuarios: listaUsuariosArray,
        usuario:usuario}
            
        res.render('reestablecer',variablesLogin)
    } catch (error) {
      next(error)
    }
  }
  