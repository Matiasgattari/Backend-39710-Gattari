import { Router } from 'express';
import { soloAdmin, soloLogueados, soloPremium } from '../middlewares/soloLogueados.js';
import { postAUsuarios, postAUsuariosLogin } from '../controllers/api/usuarios.controller.js';
import { autenticacionUserPass } from '../middlewares/passport.js';
import { deleteSesiones } from '../controllers/api/usuariosLogout.controller.js';
import { reestablecerPost } from '../controllers/api/reestablecer.controller.js';
import { multerUpload } from '../middlewares/multer.js';
import { postMulterDocuments } from '../controllers/api/postMulterDocuments.controller.js';
import { getMulterDocuments } from '../controllers/api/getMulterDocuments.controller.js';
import { usuariosRepository } from '../repository/usuariosRepository.js';

export const userRouter = Router()

userRouter.get('/info', soloLogueados, (req, res, next) => {
    // passport guarda la sesion directamente en ** req.user ** en lugar del campo session de la peticion !
    res.json(req.user)
})


//REGISTRO controlador POST a /API/USERS a la cual hice el fetch en register.js
//sin passport 
userRouter.post('/',postAUsuarios)

//LOGIN controlador POST a /api/users/login a la cual hice el fetch en login.js
//local
userRouter.post('/login', autenticacionUserPass, postAUsuariosLogin);

//LOGOUT
userRouter.delete('/login', deleteSesiones)

//REESTABLECER CONTRASEÑA
userRouter.post('/reestablecer',soloLogueados, reestablecerPost)

//ruta para cargar archivos JSON desde el navegador
userRouter.get('/premium/documents',soloPremium ,getMulterDocuments)

// Usar el middleware de multer en la ruta '/premium/:uid/documents'
userRouter.post('/premium/:uid/documents',soloPremium, multerUpload.single('archivo'), (req, res) => {
    // Acceder al archivo recibido a través de req.file
    let archivo = req.file;
    res.json({message:`Archivo cargado correctamente bajo el nombre: ${req.file?.filename}, en la ruta ${req.file?.path}`});
  });

userRouter.get('/', soloLogueados,soloAdmin,async (req, res, next) => {
   const usuarios = await usuariosRepository.buscarUsuarios()
   const usuariosModificados = usuarios.map(function (usuario) {
    return {
      email: usuario.email,
      nombre: usuario.first_name + " " + usuario.last_name,
      carrito:usuario.cart,
      rol:usuario.rol,
      ultima_conexion:usuario.last_connection,
    };
  });

  const hayUsuarios = usuariosModificados.length > 0
      
  res.render('usersList.handlebars', {
    titulo: 'Lista de usuarios',
    encabezado: 'Lista de usuarios en base de datos, sin datos sensibles',
    arrayUsuarios:usuariosModificados,
    hayUsuarios: hayUsuarios,

})

})


userRouter.get('/bussy/',soloLogueados,soloAdmin,async(req,res,next)=>{

    const usuarios = await usuariosRepository.buscarUsuarios()

    // Obtén la fecha actual
    const fechaActual = new Date();

    // Define la función de filtro para comprobar si la diferencia es mayor a 2 días
    function esMasDeDosDias(date) {
        // @ts-ignore
        const tiempoTranscurrido = fechaActual - date;
        const dosDiasEnMilisegundos = 2 * 24 * 60 * 60 * 1000; // 2 días en milisegundos
        // const dosDiasEnMilisegundos = 2 ; // 2 días en milisegundos
        return tiempoTranscurrido > dosDiasEnMilisegundos;
    }   
    
    const fechaSinFormato = usuarios.forEach(usuario=>{
        usuario.last_connection=Date.parse(usuario.last_connection)
    })

    // Filtra los usuarios
    const usuariosFiltrados = usuarios.filter(usuario => esMasDeDosDias(usuario.last_connection));

    const fechaConFormato = usuarios.forEach(usuario=>{
        usuario.last_connection=new Date(usuario.last_connection).toLocaleString()
    })

    res.render('usersBussyList.handlebars', {
        titulo: 'Lista de usuarios ausentes',
        encabezado: 'Lista de usuarios "ausentes" en base de datos, sin datos sensibles',
        arrayUsuarios:usuariosFiltrados,
        hayUsuarios: usuariosFiltrados.length>0,
    
    })

})

userRouter.put('/',soloLogueados,soloAdmin,async(req,res,next)=>{
  try {
    const IDingresado = req.body
    const usuarioString = IDingresado.username
    const usuarioEncontrado =await usuariosRepository.buscarUsuarioPorUsername(usuarioString)

      switch (usuarioEncontrado.rol) {
        case 'Admin':
          res.status(203).json({message:"Solo puede modificar el rol de User y Premium"})
          break;
      
        case 'Premium':
            usuarioEncontrado.rol = "User"
            await usuariosRepository.actualizarUsuario(usuarioEncontrado._id,usuarioEncontrado)
            res.status(201).json(usuarioEncontrado)
            break;
      
        case 'User':
            usuarioEncontrado.rol = "Premium"
            await usuariosRepository.actualizarUsuario(usuarioEncontrado._id,usuarioEncontrado)
            res.status(201).json(usuarioEncontrado)
            break;

        default:
          res.status(405).json({message:"Rol de usuario no valido"})
          break;
      }
     
  } catch (error) {

    next(error)
  }
})

userRouter.delete('/',soloLogueados,soloAdmin,async(req,res,next)=>{
    const usuarios = await usuariosRepository.buscarUsuarios()

    // Obtén la fecha actual
    const fechaActual = new Date();

    // Define la función de filtro para comprobar si la diferencia es mayor a 2 días
    function esMasDeDosDias(date) {
        // @ts-ignore
        const tiempoTranscurrido = fechaActual - date;
        const dosDiasEnMilisegundos = 2 * 24 * 60 * 60 * 1000; // 2 días en milisegundos
        // const dosDiasEnMilisegundos = 2 ; // 2 días en milisegundos
        return tiempoTranscurrido > dosDiasEnMilisegundos;
    }   
    
    const fechaSinFormato = usuarios.forEach(usuario=>{
        usuario.last_connection=Date.parse(usuario.last_connection)
    })


    const arrayFiltrados = []

    // Filtra los usuarios
    const usuariosFiltrados = usuarios.filter(usuario => esMasDeDosDias(usuario.last_connection));
    usuariosFiltrados.forEach((usuariosFiltrado)=>{
        arrayFiltrados.push(usuariosFiltrado)
    })

    const eliminarUsuarios = arrayFiltrados.forEach(async(usuario)=>{
        await usuariosRepository.eliminarUsuario( usuario._id)
    })

    res.status(201).json({message:"usuarios eliminados correctamente"})

})