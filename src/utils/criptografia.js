import bcrypt from 'bcrypt'


export function hashear(frase) {
    return bcrypt.hashSync(frase, bcrypt.genSaltSync(10))
}//esta funcion me devuelve hasheado lo que quiero encriptar, por medio de la generacion de un salt aleatorio


//comparacion de variables con bcrypt. siempre primero el dato que voy a encriptar  , y luego el encriptado. devuelve un booleano (t or f)
export function validarQueSeanIguales(recibida, almacenada) {
    return bcrypt.compareSync(recibida, almacenada)
}