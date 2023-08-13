

export function soloLogueados(req, res, next) {
    // atajo que me provee passport para ver si hay una sesion inicializada por un usuario
    if (!req.isAuthenticated()) {
        res.json({Error: "Error de Permisos", message: "Usuario no logueado. Para ver esta informacion inicie sesion"})
        return next(new Error('ERROR_DE_PERMISOS'));
    }
    next();
}

export function soloAdmin(req, res, next) {
if(req.user.rol==="Admin") {next ()} else {
    res.json({Error: "Error de Permisos", message: "Solo los Admins pueden ver esta informacion."})
    next(new Error('ERROR_DE_PERMISOS'))
}}
export function AdminPremium(req, res, next) {
if(req.user.rol==="Admin" ||req.user.rol==="Premium" ) {next ()} else {
    res.json({Error: "Error de Permisos", message: "Solo los Admins o usuarios Pemium pueden ver esta informacion."})
    next(new Error('ERROR_DE_PERMISOS'))
}}

export function soloPremium(req, res, next) {
if(req.user.rol==="Premium") {next ()} else {
    res.json({Error: "Error de Permisos", message: "Solo los usuarios Pemium pueden ver esta informacion."})
    next(new Error('ERROR_DE_PERMISOS'))
}}


export function sinLoguear(req, res, next) {
   if(req.user) {
    res.render('errorPermiso', {
        titulo: 'Error',
        encabezado: 'El usuario ya presenta una sesion iniciada. ingrese a /api/sessions/current para cerrar sesion',
        })
    }}
    