// este middleware lo que hace es comparar el rol del usuario con el rol que le doy como parametro, si el rol es el mismo retorna el next para avanzar, si no es el mismo roll retornma un next con el error de permisos.
export function soloRol(rol) {
    return function (req, res, next) {
        if (req.user?.rol === rol) return next()
        return next(new Error(`solo disponible para rol '${rol}'`))
    }
}

