export async function registroController(req, res, next) {
    try {
        // lo que estaba acá lo mandé a la estrategia de passport!
    res.status(201).json(req.user)
    } catch (error) {
        next(error)
    }
}

export async function loginController(req, res, next) {
    try {
        // lo que estaba acá lo mandé a la estrategia de passport!
    res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

export async function logoutController(req, res, next) {
 try {
       // lo que estaba acá lo reemplacé por el atajo que me provee passport
       req.logout(err => {
        res.sendStatus(200)
    })
 } catch (error) {
    next(error)
 }
}
