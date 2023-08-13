
export class ErrorDeAutenticacion extends Error {
    constructor(mensaje = 'ERROR_DE_AUTENTICACION') {
        super(mensaje);
        this.tipo = 'ERROR_DE_AUTENTICACION';
    }
}
