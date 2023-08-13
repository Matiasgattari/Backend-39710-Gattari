// import { encriptarJWT } from '../../utils/criptografia.js'

export function getCurrentSessionController(req, res, next) {
   try {
     // res.json(req.session['user'] )
     res.json(req.user)
   } catch (error) {
    req.logger.error(error.message)
    next(error)
   }
}

export async function logoutSessionsController(req, res, next) {
    try {
        res.clearCookie('jwt_authorization', {
            signed: true,
            httpOnly: true
        }) 
        res.sendStatus(200)
    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
}

// export function postSessionsController(req, res, next) {
//     try {
//         res.cookie('jwt_authorization', encriptarJWT(req.user), {
//             signed: true,
//             httpOnly: true
//         }) 
//         res.status(201).json(req.user)
//     } catch (error) {
//         next(error)
//     }
// }