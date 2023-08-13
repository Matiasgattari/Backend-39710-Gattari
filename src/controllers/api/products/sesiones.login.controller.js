import { usuariosRepository } from "../../../repository/usuariosRepository.js"
import util from 'node:util'

export async function sesionesLoginController(req,res){

    const listaUsuarios = await usuariosRepository.buscarUsuarios()

    const conUtil=util.inspect(listaUsuarios, false, 10)
    const listaUsuariosArray = []
    listaUsuarios.forEach(element => listaUsuariosArray.push(util.inspect(element, false, 10)))


    const variablesLogin ={
        pageTitle:'lista de usuarios',
        mensaje:'usuario ubicado exitosamente',
        usuario: listaUsuariosArray}
        

    res.render('login',variablesLogin)
}